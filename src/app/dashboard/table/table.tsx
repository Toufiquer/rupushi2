'use client'

import { useEffect, useState } from 'react'
import DataTable from './data-table'

import { columns } from './your-order-columns'
import { yourOrdersType } from './your-order-type'

const yourOrdersData: yourOrdersType[] = [
  {
    id: 1,
    name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    color: 'Pure matte black',
    price: 42,
    size: 'Smartwatch',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'paid',
  },
  {
    id: 2,
    name: '2021 Apple 12.9-inch iPad Pro (Wi-Fi, 128GB) - Space Gray',
    color: 'Black',
    price: 1499,
    size: 'Tablet',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'failed',
  },
  {
    id: 3,
    name: 'PlayStation 5 DualSense Wireless Controller',
    color: 'White',
    price: 299,
    size: 'Gaming controller',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'fulfilled',
  },
  {
    id: 4,
    name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    color: 'Space Gray',
    price: 1699,
    size: 'Laptop',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'shipped',
  },
  {
    id: 5,
    name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021',
    color: 'Ocean Blue',
    price: 65,
    size: 'Desktop computer',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'pending',
  },
  {
    id: 11,
    name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    color: 'Pure matte black',
    price: 42,
    size: 'Smartwatch',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'paid',
  },
  {
    id: 12,
    name: '2021 Apple 12.9-inch iPad Pro (Wi-Fi, 128GB) - Space Gray',
    color: 'Black',
    price: 1499,
    size: 'Tablet',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'failed',
  },
  {
    id: 13,
    name: 'PlayStation 5 DualSense Wireless Controller',
    color: 'White',
    price: 299,
    size: 'Gaming controller',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'fulfilled',
  },
  {
    id: 14,
    name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    color: 'Space Gray',
    price: 1699,
    size: 'Laptop',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'shipped',
  },
  {
    id: 15,
    name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021',
    color: 'Ocean Blue',
    price: 65,
    size: 'Desktop computer',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'pending',
  },
  {
    id: 21,
    name: 'Fitbit Sense Advanced Smartwatch with Tools for Heart Health, Stress Management & Skin Temperature Trends, Carbon/Graphite, One Size (S & L Bands)',
    color: 'Pure matte black',
    price: 42,
    size: 'Smartwatch',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'paid',
  },
  {
    id: 22,
    name: '2021 Apple 12.9-inch iPad Pro (Wi-Fi, 128GB) - Space Gray',
    color: 'Black',
    price: 1499,
    size: 'Tablet',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'failed',
  },
  {
    id: 23,
    name: 'PlayStation 5 DualSense Wireless Controller',
    color: 'White',
    price: 299,
    size: 'Gaming controller',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'fulfilled',
  },
  {
    id: 24,
    name: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    color: 'Space Gray',
    price: 1699,
    size: 'Laptop',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'shipped',
  },
  {
    id: 25,
    name: 'Apple iMac 24" 4K Retina Display M1 8 Core CPU, 7 Core GPU, 256GB SSD, Green (MJV83ZP/A) 2021',
    color: 'Ocean Blue',
    price: 65,
    size: 'Desktop computer',
    img: 'https://i.ibb.co/ZfzRN83/product.png',
    productUrl: 'https://i.ibb.co/ZfzRN83/product.png',
    width: '400g',
    orderId: '14746',
    date: 'March 1, 2016',
    quantity: 3,
    status: 'pending',
  },
]

export default function DemoTable({
  viewTotalCount,
}: {
  viewTotalCount: boolean
}) {
  const [dataTable, setDataTable] = useState<yourOrdersType[]>([])
  useEffect(() => {
    setTimeout(() => {
      setDataTable(yourOrdersData)
    }, 2000)
  }, [])
  return (
    <div className="px-4">
      {dataTable.length > 0 ? (
        <div>
          {viewTotalCount && (
            <h2 className="text-xl">Total Orders: {dataTable.length}</h2>
          )}
          <DataTable columns={columns} data={dataTable} />
        </div>
      ) : (
        <h2 className="text-center">Loading...</h2>
      )}
    </div>
  )
}
