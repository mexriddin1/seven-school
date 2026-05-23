import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'eco_stages',
  tTable: 'eco_stage_translations',
  fkColumn: 'eco_stage_id',
  parentColumns: ['step_label', 'sort_order', 'is_published'],
  translationColumns: ['title', 'age', 'description'],
  publicColumns: ['id', 'step_label', 'sort_order'],
});
