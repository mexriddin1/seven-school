import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'individual_stats',
  tTable: 'individual_stat_translations',
  fkColumn: 'individual_stat_id',
  parentColumns: ['num', 'sort_order', 'is_published'],
  translationColumns: ['lbl', 'sub'],
  publicColumns: ['id', 'num', 'sort_order'],
});
