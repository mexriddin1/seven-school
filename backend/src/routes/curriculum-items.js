import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'curriculum_items',
  tTable: 'curriculum_item_translations',
  fkColumn: 'curriculum_item_id',
  parentColumns: ['image_id', 'sort_order', 'is_published'],
  translationColumns: ['title', 'description'],
  publicColumns: ['id', 'image_id', 'sort_order'],
  extraJoins: 'LEFT JOIN media m ON m.id = curriculum_items.image_id',
  extraSelect: 'm.url AS image_url',
});
