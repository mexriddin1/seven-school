'use client';
import { CrudFormPage } from '@/components/crud/CrudFormPage';
import { curriculumItemsConfig } from '@/components/crud/configs';
export default function Page() { return <CrudFormPage cfg={curriculumItemsConfig} />; }
