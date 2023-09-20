import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const productdeleted = await Product.findByIdAndDelete(params.id);
    if (!productdeleted) {
      return NextResponse.json(
        {
          message: "No se encontro el producto",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(productdeleted);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}
export async function GET(req, { params }) {
  try {
    const nombre = params.id;
    const findProduct = await Product.find({
      nombre: { $regex: nombre, $options: "i" },
    }).lean();

    if (!findProduct || findProduct.length === 0) {
      return NextResponse.json(
        {
          message: "No se encontraron productos :C",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(findProduct);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}

export async function PUT(req, { params }) {
  const data = await req.json();
  try {
    const productUpdate = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    return NextResponse.json(productUpdate);
  } catch (err) {
    return NextResponse.json(err.message, {
      status: 400,
    });
  }
}
