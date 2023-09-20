import { NextResponse } from "next/server";
import "@/utils/mongoose";
import Product from "@/models/Product";

export async function GET(req) {
  const products = await Product.find();
  return NextResponse.json(products);
}

export async function POST(req) {
  const data = await req.json();
  const { nombre, referencia } = data;
  try {
    const productFound = await Product.findOne({ nombre });
    const productFound2 = await Product.findOne({ referencia });
    if (productFound || productFound2) {
      return NextResponse.json(
        { message: "El producto ya existe" },
        { status: 400 }
      );
    }
    const newProduct = new Product(data);
    const savedProduct = await newProduct.save();
    console.log("savedProduct", savedProduct);
    return NextResponse.json(savedProduct);
  } catch (err) {
    console.log("err", err);
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}
