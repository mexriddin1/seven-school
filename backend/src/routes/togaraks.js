import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'togaraks',
  tTable: 'togarak_translations',
  fkColumn: 'togarak_id',
  parentColumns: ['image_id', 'sort_order', 'is_published'],
  translationColumns: ['title'],
  publicColumns: ['id', 'image_id', 'sort_order'],
  extraJoins: 'LEFT JOIN media m ON m.id = togaraks.image_id',
  extraSelect: 'm.url AS image_url',
});
