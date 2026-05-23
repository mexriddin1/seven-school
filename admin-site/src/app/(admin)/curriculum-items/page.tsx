'use client';
import { CrudListPage } from '@/components/crud/CrudListPage';
import { curriculumItemsConfig } from '@/components/crud/configs';
export default function Page() { return <CrudListPage cfg={curriculumItemsConfig} />; }
