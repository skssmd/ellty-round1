import React, { useState, useMemo, useCallback } from 'react';
import { Card } from './components/ui/card';
import { Button } from './components/ui/button';
import { Checkbox } from './components/ui/checkbox';


interface Page {
  id: number;
  name: string;
  checked: boolean;
}
const checkboxStyles = `w-5 h-5
    data-[state=checked]:bg-blue-500
    data-[state=checked]:border-blue-500
    data-[state=checked]:text-white
    hover:bg-blue-100
  `;
interface PageListItemProps {
  page: Page;
  onToggle: (id: number, checked: boolean) => void;
}


const PageListItem: React.FC<PageListItemProps> = ({ page, onToggle }) => (
  <div className="flex items-center justify-between py-2 px-3 ">
    <span className="text-lg font-medium text-gray-700 select-none">{page.name}</span>

  <Checkbox
  id={`page-${page.id}`}
  checked={page.checked}
  onCheckedChange={(checked) => onToggle(page.id, Boolean(checked))}
  className={checkboxStyles}
/>

  </div>
);

const initialPages: Page[] = [
  { id: 1, name: 'Page 1', checked: false },
  { id: 2, name: 'Page 2', checked: false },
  { id: 3, name: 'Page 3', checked: false },
  { id: 4, name: 'Page 4', checked: false },
];

const App: React.FC = () => {
  const [pages, setPages] = useState<Page[]>(initialPages);

  const allChecked = useMemo(() => pages.every(page => page.checked), [pages]);

  const handleToggleAll = useCallback(() => {
    const next = !allChecked;
    setPages(pages.map(p => ({ ...p, checked: next })));
  }, [pages, allChecked]);


  const handleTogglePage = useCallback((id: number, checked: boolean) => {
    setPages(prev =>
      prev.map(page => (page.id === id ? { ...page, checked } : page))
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4 sm:p-8 font-[Inter]">
      <Card className="w-full max-w-sm md:max-w-md shadow-md p-6">

        {/* All Pages */}
        <div className="flex items-center justify-between px-3">
          <label htmlFor="all-pages" className="cursor-pointer text-lg">
            All Pages
          </label>

          <Checkbox
            id="all-pages"
            checked={allChecked}
            onCheckedChange={handleToggleAll}
             className={checkboxStyles}
          />
        </div>

        {/* Page List */}
        <div className="bg-white border-t border-b border-gray-200 divide-y divide-gray-100">
          {pages.map(page => (
            <PageListItem
              key={page.id}
              page={page}
              onToggle={handleTogglePage}
            />
          ))}
        </div>

        <Button className="bg-yellow-400 hover:bg-yellow-300 text-black ">
          Done
        </Button>
      </Card>
    </div>
  );
};

export default App;
