'use client';
import { CrudFormPage } from '@/components/crud/CrudFormPage';
import { scheduleItemsConfig } from '@/components/crud/configs';
export default function Page() { return <CrudFormPage cfg={scheduleItemsConfig} />; }
