import SQLite from 'react-native-sqlite-storage';

/**
 * Хранилище фотографий (SQLite)
 *
 * Отвечает за:
 * - хранение фотографий внутри альбомов
 * - сохранение порядка фотографий (sortOrder)
 * - Drag & Drop сортировку
 * - синхронизацию с AlbumsTable (countPhoto, coverPhoto)
 */

const db = SQLite.openDatabase({name: 'database.db', location: 'default'});

/**
 * Инициализация таблицы фотографий
 */

const initPhotosTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS PhotosTable (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        album_id INTEGER,
        title TEXT,
        photo BLOB,
        created_at TEXT,
        sortOrder INTEGER,
        FOREIGN KEY (album_id) REFERENCES AlbumsTable (id)
      )
      `,
      [],
      () => console.log('Таблица фотографий создана'),
      error => console.error('❌ Ошибка создания таблицы PhotosTable', error),
    );
  });

  ensureSortOrderColumn();
};

/**
 * Гарантирует наличие колонки sortOrder
 * (миграция)
 */

const ensureSortOrderColumn = () => {
  db.transaction(tx => {
    tx.executeSql('PRAGMA table_info(PhotosTable)', [], (_, result) => {
      const hasSortOrder = Array.from({length: result.rows.length}, (_, i) =>
        result.rows.item(i),
      ).some(col => col.name === 'sortOrder');

      if (!hasSortOrder) {
        tx.executeSql('ALTER TABLE PhotosTable ADD COLUMN sortOrder INTEGER');
      }
    });
  });
};

initPhotosTable();

/**
 * Добавление фотографии в альбом
 * Новые фотографии добавляются в конец (max(sortOrder) + 1)
 */

const useAddPhotoInAlbum = () => {
  return photoData => {
    db.transaction(tx => {
      console.log('Добавление фотографии в конец альбома');

      tx.executeSql(
        'SELECT MAX(sortOrder) AS maxOrder FROM PhotosTable WHERE album_id = ?',
        [photoData.album_id],
        (_, result) => {
          const maxOrder = result.rows.item(0)?.maxOrder ?? -1;
          const newSortOrder = maxOrder + 1;

          // Добавление новой фотографии в конец
          tx.executeSql(
            `
            INSERT INTO PhotosTable
              (album_id, title, photo, created_at, sortOrder)
            VALUES (?, ?, ?, ?, ?)
            `,
            [
              photoData.album_id,
              photoData.title,
              photoData.photo,
              photoData.created_at,
              newSortOrder,
            ],
            () => {
              console.log(
                `Фотография добавлена в альбом (sortOrder = ${newSortOrder})`,
              );

              // Обновление счётчика фотографий
              tx.executeSql(
                'UPDATE AlbumsTable SET countPhoto = countPhoto + 1 WHERE id = ?',
                [photoData.album_id],
                () => {
                  console.log('Счётчик фотографий успешно обновлён.');
                },
                error => {
                  console.error(
                    'Ошибка при обновлении счётчика фотографий:',
                    error,
                  );
                },
              );

              // Проверяем установлена ли фотография в качестве обложки вручную
              tx.executeSql(
                'SELECT manualCoverMode FROM AlbumsTable WHERE id = ?',
                [photoData.album_id],
                (_, selectResults) => {
                  const manualCoverMode =
                    selectResults.rows.item(0)?.manualCoverMode;

                  if (!manualCoverMode) {
                    // Устанавливаем текущую фотографию как обложку
                    tx.executeSql(
                      'UPDATE AlbumsTable SET coverPhoto = ? WHERE id = ?',
                      [photoData.photo, photoData.album_id],
                      () => {
                        console.log(
                          'Обложка альбома обновлена на последнюю добавленную фотографию.',
                        );
                      },
                      error => {
                        console.error(
                          'Ошибка при обновлении обложки альбома:',
                          error,
                        );
                      },
                    );
                  } else {
                    console.log(
                      'Обложка не обновлена, так как включён ручной режим.',
                    );
                  }
                },
                error => {
                  console.error(
                    'Ошибка при проверке режима установки обложки:',
                    error,
                  );
                },
              );
            },
            error => {
              console.error('Ошибка при добавлении фотографии:', error);
            },
          );
        },
        error => {
          console.error(
            'Ошибка при получении текущего порядка фотографий:',
            error,
          );
        },
      );
    });
  };
};

/**
 * Получение фотографий альбома в сохранённом порядке
 */

const useGetPhotoFromAlbum = () => {
  return (albumId, setPhotos) => {
    db.transaction(tx => {
      tx.executeSql(
        `
        SELECT * FROM PhotosTable
        WHERE album_id = ?
        ORDER BY sortOrder ASC
        `,
        [albumId],
        (_, results) => {
          const photos = [];
          for (let i = 0; i < results.rows.length; i++) {
            photos.push(results.rows.item(i));
          }

          console.log(
            '📥 Фото загружены:',
            photos.map(p => ({
              id: p.id,
              sortOrder: p.sortOrder,
            })),
          );

          setPhotos(photos);
        },
        error => console.error('❌ Ошибка получения фотографий', error),
      );
    });
  };
};

/**
 * Сохранение порядка фотографий после Drag & Drop
 */

const useSavePhotosOrder = () => {
  return photos => {
    // console.log(
    //   '💾 Сохраняем порядок фото:',
    //   photos.map(p => p.id),
    // );

    db.transaction(
      tx => {
        photos.forEach((photo, index) => {
          tx.executeSql('UPDATE PhotosTable SET sortOrder = ? WHERE id = ?', [
            index,
            photo.id,
          ]);
        });
      },
      error => console.error('❌ Ошибка сохранения порядка фото', error),
      () => console.log('Порядок фотографий сохранён'),
    );
  };
};

const useGetCountPhotos = () => {
  return () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT COUNT(*) AS count FROM PhotosTable',
          [],
          (tx, result) => {
            const photoCount = result.rows.item(0).count;
            console.log('Количество фотографий:', photoCount);
            resolve(photoCount);
          },
          error => {
            console.log('Ошибка при получении данных из таблицы:', error);
            reject(error);
          },
        );
      });
    });
  };
};

const useDeleteAllPhotos = () => {
  return () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM PhotosTable',
        [],
        (_, results) => {
          console.log(`Все фотографии, всех альбомов успешно удалены.`);
        },
        error => {
          console.error('Ошибка при удалении фотографий:', error);
        },
      );
    });
  };
};

const useDeleteAllPhotosCurrentAlbum = () => {
  return albumId => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM PhotosTable WHERE album_id = ?',
        [albumId],
        (_, results) => {
          console.log(`Фотографии из альбома с ID ${albumId} успешно удалены.`);
        },
        error => {
          console.error('Ошибка при удалении фотографий:', error);
        },
      );

      // После очистки альбома обнуляем счётчик фотографий
      tx.executeSql(
        'UPDATE AlbumsTable SET countPhoto = 0 WHERE id = ?',
        [albumId],
        (_, updateResults) => {
          console.log('Счётчик фотографий обнулён.');
        },
        error => {
          console.error('Ошибка при обновлении счётчика фотографий:', error);
        },
      );

      // Обнуление обложки альбома
      tx.executeSql(
        'UPDATE AlbumsTable SET coverPhoto = null WHERE id = ?',
        [albumId],
        (_, updateResults) => {
          console.log('Обложка обнулена');
        },
        error => {
          console.error('Ошибка при обнуление обложки:', error);
        },
      );

      // Переводим ручной режим установки обложки альбома снова в автоматический
      tx.executeSql(
        'UPDATE AlbumsTable SET manualCoverMode = 0 WHERE id =?',
        [albumId],
        (_, updateResults) => {
          console.log('Режим обложки переведен в автоматический');
        },
        error => {
          console.error('Ошибка при обнуление режима:', error);
        },
      );
    });
  };
};

const useDeletePhoto = () => {
  return (albumId, photoId) => {
    db.transaction(tx => {
      // Удаление фотографии
      tx.executeSql(
        'DELETE FROM PhotosTable WHERE album_id = ? AND id = ?',
        [albumId, photoId],
        (_, results) => {
          if (results.rowsAffected > 0) {
            console.log(
              `Фотография с ID ${photoId} из альбома с ID ${albumId} успешно удалена.`,
            );

            // Обновляем счётчик фотографий
            tx.executeSql(
              'UPDATE AlbumsTable SET countPhoto = countPhoto - 1 WHERE id = ? AND countPhoto > 0',
              [albumId],
              (_, updateResults) => {
                console.log('Счётчик фотографий успешно обновлён.');

                // Проверяем количество оставшихся фотографий в альбоме
                tx.executeSql(
                  'SELECT COUNT(*) as photoCount FROM PhotosTable WHERE album_id = ?',
                  [albumId],
                  (_, countResults) => {
                    const photoCount = countResults.rows.item(0)?.photoCount;

                    if (photoCount === 0) {
                      // Если фотографий больше нет, обнуляем обложку и сбрасываем manualCoverMode
                      tx.executeSql(
                        'UPDATE AlbumsTable SET coverPhoto = NULL, manualCoverMode = 0 WHERE id = ?',
                        [albumId],
                        () => {
                          console.log(
                            'Обложка альбома удалена, manualCoverMode сброшен в 0.',
                          );
                        },
                        error => {
                          console.error(
                            'Ошибка при обнулении обложки и сбросе manualCoverMode:',
                            error,
                          );
                        },
                      );
                    } else {
                      // Если manualCoverMode не активен, обновляем обложку на последнюю оставшуюся фотографию
                      tx.executeSql(
                        'SELECT manualCoverMode FROM AlbumsTable WHERE id = ?',
                        [albumId],
                        (_, selectResults) => {
                          const manualCoverMode =
                            selectResults.rows.item(0)?.manualCoverMode;

                          if (!manualCoverMode) {
                            // Выбираем последнюю фотографию
                            tx.executeSql(
                              'SELECT photo FROM PhotosTable WHERE album_id = ? ORDER BY created_at DESC LIMIT 1',
                              [albumId],
                              (_, photoResults) => {
                                if (photoResults.rows.length > 0) {
                                  const lastPhoto =
                                    photoResults.rows.item(0).photo;

                                  tx.executeSql(
                                    'UPDATE AlbumsTable SET coverPhoto = ? WHERE id = ?',
                                    [lastPhoto, albumId],
                                    () => {
                                      console.log(
                                        'Обложка альбома обновлена на последнюю доступную фотографию.',
                                      );
                                    },
                                    error => {
                                      console.error(
                                        'Ошибка при обновлении обложки альбома:',
                                        error,
                                      );
                                    },
                                  );
                                }
                              },
                              error => {
                                console.error(
                                  'Ошибка при проверке оставшихся фотографий:',
                                  error,
                                );
                              },
                            );
                          } else {
                            console.log(
                              'Ручной режим установлен, обложка не обновляется.',
                            );
                          }
                        },
                        error => {
                          console.error(
                            'Ошибка при проверке режима установки обложки:',
                            error,
                          );
                        },
                      );
                    }
                  },
                  error => {
                    console.error(
                      'Ошибка при проверке количества оставшихся фотографий:',
                      error,
                    );
                  },
                );
              },
              error => {
                console.error(
                  'Ошибка при обновлении счётчика фотографий:',
                  error,
                );
              },
            );
          } else {
            console.log('Фотография не найдена.');
          }
        },
        error => {
          console.error('Ошибка при удалении фотографии:', error);
        },
      );
    });
  };
};

const useClearTable = () => {
  return tableName => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${tableName}`,
        [],
        (tx, result) => {
          console.log('Table deleted successfully');
        },
        error => {
          console.log('Error deleting table:', error);
        },
      );
    });
  };
};

export function usePhotoRequest() {
  const addPhoto = useAddPhotoInAlbum();
  const getPhoto = useGetPhotoFromAlbum();
  const savePhotosOrder = useSavePhotosOrder();
  const getCountPhotos = useGetCountPhotos();
  const deleteAllPhotos = useDeleteAllPhotos();
  const deleteAllPhotosCurrentAlbum = useDeleteAllPhotosCurrentAlbum();
  const deletePhoto = useDeletePhoto();
  const dropTable = useClearTable();

  return {
    addPhoto,
    getPhoto,
    savePhotosOrder,
    getCountPhotos,
    deleteAllPhotos,
    deleteAllPhotosCurrentAlbum,
    deletePhoto,
    dropTable,
  };
}
