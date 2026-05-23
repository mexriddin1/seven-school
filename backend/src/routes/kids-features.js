import { buildCrudRouter } from '../lib/crud.js';

export default buildCrudRouter({
  table: 'kids_features',
  tTable: 'kids_feature_translations',
  fkColumn: 'kids_feature_id',
  parentColumns: ['image_id', 'sort_order', 'is_published'],
  translationColumns: ['title', 'description'],
  publicColumns: ['id', 'image_id', 'sort_order'],
  extraJoins: 'LEFT JOIN media m ON m.id = kids_features.image_id',
  extraSelect: 'm.url AS image_url',
});
