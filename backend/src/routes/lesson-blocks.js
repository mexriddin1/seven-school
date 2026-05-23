import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'lesson_blocks',
  tTable: 'lesson_block_translations',
  fkColumn: 'lesson_block_id',
  parentColumns: ['icon', 'sort_order', 'is_published'],
  translationColumns: ['title', 'description', 'tags_json'],
  publicColumns: ['id', 'icon', 'sort_order'],
});
