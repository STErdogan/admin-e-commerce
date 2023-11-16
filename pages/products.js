import Layout from "@/components/Layout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IconConst, Icons } from "@/icons/icons";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((res) => {
      setProducts(res.data);
    });
  }, []);

  console.log(products);

  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white rounded-md py-1 px-2"
        href={"/products/new"}
      >
        Yeni ürün ekle
      </Link>

      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Ürün Adı</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} id={product._id}>
              <td>{product.title}</td>
              <td>
                <Link href={"products" + product._id}>
                  <Icons type={IconConst.PEN} className="w-3 h-3" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
