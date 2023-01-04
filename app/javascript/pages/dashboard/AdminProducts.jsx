import React, { useState } from 'react';
import { Switch, IconButton } from "@material-tailwind/react";
import useAdminProducts from '../hooks/useAdminProducts';
import Delete from '../../components/admin/modals/Delete';
import Edit from '../../components/admin/modals/Edit';

const AdminProducts = () => {
  const adminProducts = useAdminProducts();
  const [productName, setProductName] = useState('');

  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = (name) => {
    setOpenDelete(!openDelete)
    setProductName(name)
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      {adminProducts === 0 ?
        <div className='h-[30rem]'>
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-32 w-32" />
          </div>
        </div> :
      (<><div className="flex flex-col mt-8">
        <div className="overflow-x-auto rounded-lg">
          <div className="align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sales
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Publish
                    </th>
                    <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {adminProducts && adminProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                        <img src={product && product.photos_urls[0]} alt={product.name} className='h-[3rem] w-[3rem] object-contain' />
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {product.name}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {product.price.toLocaleString('en-US', {
                          style: 'currency',
                          currency: product.currency,
                        })}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {product.sales_count || 0}
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        <Switch />
                      </td>
                      <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        <div className="flex gap-4">
                          <IconButton className='bg-gray-400 hover:bg-blue-gray-900 shadow-none' onClick={handleOpen}>
                            <i className="fas fa-edit" />
                          </IconButton>
                          <IconButton className='bg-gray-500 hover:bg-red-500 shadow-none' onClick={() => handleOpenDelete(product.name)}>
                            <i className="fas fa-trash" />
                          </IconButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div><Delete openDelete={openDelete} handleOpenDelete={handleOpenDelete} productName={productName} /><Edit open={open} handleOpen={handleOpen} /></>)}
    </>
  )
}

export default AdminProducts;