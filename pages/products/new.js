import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct(e) {
    e.preventDefault();
    const data = { title, description, price };
    await axios.post("/api/products", data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>Yeni Ürün</h1>
        <label>Ürün Adı</label>
        <input
          type="text"
          placeholder="ürün Adı"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Açıklama</label>
        <textarea
          placeholder="açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label>Fiyat</label>
        <input
          type="number"
          placeholder="fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <button className="btn-primary">Kaydet</button>
      </form>
    </Layout>
  );
}
