import { useState } from 'react';

// 定義產品類型
interface Product {
  category: string;
  price: string;
  stocked: boolean;
  name: string;
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
function ProductTable({ products }: { products: Product[] }) {
  const rows: React.ReactElement[] = [];
  let lastCategory: string | null = null;

  // 組織產品數據，按類別分組
  products.forEach((product) => {
    // 當類別改變時，添加類別行
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
function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="搜索..." />
      <label>
        <input type="checkbox" />
        {' '}
        只顯示有庫存的產品
      </label>
    </form>
  );
}

// 可過濾的產品表格組件
// 包含搜索欄和產品表格
function FilterableProductTable({ products }: { products: Product[] }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
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
