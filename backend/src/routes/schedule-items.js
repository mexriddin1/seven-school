import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'schedule_items',
  tTable: 'schedule_item_translations',
  fkColumn: 'schedule_item_id',
  parentColumns: ['time_label', 'kind', 'sort_order', 'is_published'],
  translationColumns: ['title', 'description'],
  publicColumns: ['id', 'time_label', 'kind', 'sort_order'],
});
