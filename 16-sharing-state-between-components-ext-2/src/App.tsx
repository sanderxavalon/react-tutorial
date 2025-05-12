import { useState } from 'react';

// 定義產品類型
interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
}

// 可過濾的產品表格組件
// 包含搜索欄和產品表格
function FilterableProductTable({ products }: { products: Product[] }) {
  // 搜索文本狀態
  const [filterText, setFilterText] = useState('蘋果');
  // 是否只顯示有庫存的產品
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly} />
      <ProductTable 
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly} />
    </div>
  );
}

// 產品類別行組件
function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>
        {category}
      </th>
    </tr>
  );
}

// 產品行組件
function ProductRow({ product }: { product: Product }) {
  // 如果產品缺貨，將名稱顯示為紅色
  const name = product.stocked ? product.name :
    <span style={{ color: 'red' }}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// 產品表格組件
function ProductTable({ products, filterText, inStockOnly }: { 
  products: Product[]; 
  filterText: string; 
  inStockOnly: boolean;
}) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  // 過濾並組織產品數據
  products.forEach((product) => {
    // 根據搜索文本過濾
    if (
      product.name.toLowerCase().indexOf(
        filterText.toLowerCase()
      ) === -1
    ) {
      return;
    }
    // 根據庫存狀態過濾
    if (inStockOnly && !product.stocked) {
      return;
    }
    // 添加類別行
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    // 添加產品行
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>名稱</th>
          <th>價格</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// 搜索欄組件
function SearchBar({ 
  filterText, 
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}: { 
  filterText: string; 
  inStockOnly: boolean;
  onFilterTextChange: (value: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
}) {
  return (
    <form>
      <input 
        type="text" 
        value={filterText} 
        placeholder="搜索..."
        onChange={(e) => onFilterTextChange(e.target.value)}/>
      <label>
        <input 
          type="checkbox" 
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)} />
        {' '}
        只顯示有庫存的產品
      </label>
    </form>
  );
}

// 產品數據
const PRODUCTS = [
  {category: "水果", price: "$1", stocked: true, name: "蘋果"},
  {category: "水果", price: "$1", stocked: true, name: "火龍果"},
  {category: "水果", price: "$2", stocked: false, name: "百香果"},
  {category: "蔬菜", price: "$2", stocked: true, name: "菠菜"},
  {category: "蔬菜", price: "$4", stocked: false, name: "南瓜"},
  {category: "蔬菜", price: "$1", stocked: true, name: "豌豆"}
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
