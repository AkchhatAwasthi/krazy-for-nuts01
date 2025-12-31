@@ .. @@
 import AddProductModal from '../components/AddProductModal';
 import EditProductModal from '../components/EditProductModal';
 import TodaysOrders from '../components/TodaysOrders';
+import VariantManagementModal from '../components/VariantManagementModal';

 interface Product {
@@ .. @@
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
   const [actionLoading, setActionLoading] = useState<string | null>(null);
   const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
+  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
+  const [selectedProductForVariants, setSelectedProductForVariants] = useState<Product | null>(null);

   const categories = [
@@ .. @@
     }
   };

+  const handleManageVariants = (productId: string) => {
+    const product = products.find(p => p.id === productId);
+    if (product) {
+      setSelectedProductForVariants(product);
+      setIsVariantModalOpen(true);
+    }
+  };
+
+  const handleVariantsUpdated = () => {
+    loadProducts();
+    setIsVariantModalOpen(false);
+    setSelectedProductForVariants(null);
+    setMessage({ type: 'success', text: 'Product variants updated successfully!' });
+    setTimeout(() => setMessage(null), 3000);
+  };
+
   return (
@@ .. @@
                           <div className="flex space-x-2">
                             <button
                               onClick={() => editProduct(product.id)}
                               disabled={actionLoading === `edit-${product.id}`}
                               className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                               title="Edit Product"
                             >
                               <Edit className="w-4 h-4" />
                             </button>
+                            <button
+                              onClick={() => handleManageVariants(product.id)}
+                              className="p-2 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200"
+                              title="Manage Variants"
+                            >
+                              <Package className="w-4 h-4" />
+                            </button>
                             <button
                               onClick={() => deleteProduct(product.id)}
                               disabled={actionLoading === `delete-${product.id}`}
                               className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                               title="Delete Product"
                             >
                               <Trash2 className="w-4 h-4" />
                             </button>
@@ .. @@
         product={selectedProduct}
         onProductUpdated={handleProductUpdated}
       />
+      
+      <VariantManagementModal
+        isOpen={isVariantModalOpen}
+        onClose={() => {
+          setIsVariantModalOpen(false);
+          setSelectedProductForVariants(null);
+        }}
+        product={selectedProductForVariants}
+        onVariantsUpdated={handleVariantsUpdated}
+      />
     </div>