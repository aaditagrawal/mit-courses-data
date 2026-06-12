import { ApiDocsPage } from '@/components/ApiDocsPage';

export const metadata = {
    title: 'API Docs | Course Web',
    description: 'REST API documentation for querying course and degree data',
};

export default function ApiDocsRoute() {
    return <ApiDocsPage />;
}
