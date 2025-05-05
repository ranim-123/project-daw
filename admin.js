// tasana hta yatlawda html css bch dir function hadi

document.addEventListener("DOMContentLoaded", function () {
  // التحقق مما إذا كان المستخدم مسجل الدخول
  const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";

  if (!isLoggedIn) {
    // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجلاً
    window.location.href = "login.html";
    return;
  }
  // زر تبديل القائمة للجوال
  const mobileMenuToggle = document.createElement("button");
  mobileMenuToggle.className = "mobile-menu-toggle";
  mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  document.querySelector(".top-nav").prepend(mobileMenuToggle);

  mobileMenuToggle.addEventListener("click", function () {
    document.querySelector(".sidebar").classList.toggle("active");
  });

  // تهيئة الرسوم البيانية البسيطة
  const salesCtx = document.getElementById("salesChart").getContext("2d");
  const trafficCtx = document.getElementById("trafficChart").getContext("2d");

  // رسم بياني مبسط للمبيعات
  new Chart(salesCtx, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Sales",
          data: [12000, 19000, 15000, 22000, 20000, 25000],
          borderColor: "#4e73df",
          backgroundColor: "rgba(78, 115, 223, 0.1)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          ticks: {
            callback: (value) => "$" + value.toLocaleString(),
          },
        },
      },
    },
  });

  // رسم بياني مبسط لحركة المرور
  new Chart(trafficCtx, {
    type: "doughnut",
    data: {
      labels: ["Direct", "Referral", "Social"],
      datasets: [
        {
          data: [40, 35, 25],
          backgroundColor: ["#4e73df", "#1cc88a", "#36b9cc"],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });

  // تبديل قائمة الشريط الجانبي البسيط
  document.querySelectorAll(".sidebar-menu li").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelectorAll(".sidebar-menu li")
        .forEach((i) => i.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // إشعار بسيط
  document
    .querySelector(".notifications")
    .addEventListener("click", function () {
      alert("You have new notifications");
    });

  // تسجيل الخروج البسيط
  document.querySelector(".logout-btn").addEventListener("click", function (e) {
    e.preventDefault();
    if (confirm("Logout?")) {
      // يطلب التأكيد
      // مسح حالة تسجيل الدخول (اختياري، يعتمد على ما إذا كانت main.html تستخدم هذه العلامة)
      localStorage.removeItem("adminLoggedIn");

      // إعادة التوجيه إلى الصفحة الرئيسية
      window.location.href = "main.html";
    }
  });

  // التنقل بين الأقسام
  document.querySelectorAll(".sidebar-menu li a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // تحديث عنصر القائمة النشط
      document.querySelectorAll(".sidebar-menu li").forEach((item) => {
        item.classList.remove("active");
      });
      this.parentElement.classList.add("active");

      // إظهار القسم المقابل
      const targetSection = this.getAttribute("data-section");
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.remove("active");
      });
      document.getElementById(targetSection).classList.add("active");
    });
  });

  // إدارة المنتجات
  if (document.querySelector(".products-table")) {
    // إضافة منتج جديد
    document.querySelector(".btn-add").addEventListener("click", function () {
      // إنشاء نافذة منبثقة لإضافة منتج جديد
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Add New Product</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="add-product-form">
                            <div class="form-group">
                                <label for="product-name">Product Name</label>
                                <input type="text" id="product-name" required>
                            </div>
                            <div class="form-group">
                                <label for="product-category">Category</label>
                                <select id="product-category" required>
                                    <option value="">Select Category</option>
                                    <option value="shoes">Shoes</option>
                                    <option value="clothing">Clothing</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="product-price">Price ($)</label>
                                <input type="number" id="product-price" step="0.01" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="product-stock">Stock Quantity</label>
                                <input type="number" id="product-stock" min="0" required>
                            </div>
                            <div class="form-group">
                                <label for="product-description">Description</label>
                                <textarea id="product-description" rows="3"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="product-image">Image URL</label>
                                <input type="text" id="product-image" placeholder="image-daw/product.png">
                            </div>
                            <div class="form-group">
                                <label>Upload Image</label>
                                <div class="file-upload">
                                    <input type="file" id="image-upload" accept="image/*">
                                    <label for="image-upload" class="file-upload-btn">Choose File</label>
                                    <span class="file-name">No file chosen</span>
                                </div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn-cancel">Cancel</button>
                                <button type="submit" class="btn-save">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

      // إضافة النافذة المنبثقة إلى DOM
      document.body.appendChild(modal);

      // إظهار النافذة المنبثقة
      setTimeout(() => {
        modal.style.display = "block";
        modal.classList.add("show");
      }, 4);

      // إغلاق النافذة المنبثقة عند النقر على X
      modal.querySelector(".close").addEventListener("click", () => {
        closeModal(modal);
      });

      // إغلاق النافذة المنبثقة عند النقر على زر الإلغاء
      modal.querySelector(".btn-cancel").addEventListener("click", () => {
        closeModal(modal);
      });

      // إغلاق النافذة المنبثقة عند النقر خارجها
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });

      // معالجة تحميل الملفات
      const fileUpload = modal.querySelector("#image-upload");
      const fileName = modal.querySelector(".file-name");

      fileUpload.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          fileName.textContent = this.files[0].name;

          // معاينة الصورة (اختياري)
          const reader = new FileReader();
          reader.onload = function (e) {
            // إذا كنت ترغب في عرض معاينة
            // const preview = document.createElement('img');
            // preview.src = e.target.result;
            // preview.style.maxWidth = '100%';
            // preview.style.marginTop = '10px';
            // modal.querySelector('.file-upload').appendChild(preview);
          };
          reader.readAsDataURL(this.files[0]);
        }
      });

      // معالجة تقديم النموذج
      const form = modal.querySelector("#add-product-form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على قيم النموذج
        const name = document.getElementById("product-name").value;
        const category = document.getElementById("product-category").value;
        const price = parseFloat(
          document.getElementById("product-price").value
        );
        const stock = parseInt(document.getElementById("product-stock").value);
        const description = document.getElementById(
          "product-description"
        ).value;
        const imageUrl =
          document.getElementById("product-image").value ||
          "image-daw/placeholder.png";

        // إنشاء كائن المنتج الجديد
        const newProduct = {
          id: generateProductId(),
          name: name,
          category: category,
          price: price,
          stock: stock,
          description: description,
          image: imageUrl,
        };

        // في تطبيق حقيقي، سترسل هذا إلى واجهة برمجة التطبيقات الخلفية
        // في الوقت الحالي، سنضيفه فقط إلى الجدول
        addProductToTable(newProduct);

        // إغلاق النافذة المنبثقة
        closeModal(modal);

        // عرض إشعار نجاح
        showNotification("Product added successfully!");
      });
    });

    // دالة لإغلاق النافذة المنبثقة
    function closeModal(modal) {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.remove();
      }, 300);
    }

    // دالة لإنشاء معرف منتج
    function generateProductId() {
      // الحصول على أعلى معرف منتج من الجدول
      const productRows = document.querySelectorAll(".products-table tbody tr");
      let highestId = 0;

      productRows.forEach((row) => {
        const idText = row.querySelector("td:first-child").textContent;
        const idNum = parseInt(idText.replace("#PRD-", ""));
        if (idNum > highestId) {
          highestId = idNum;
        }
      });

      // إرجاع المعرف التالي
      const nextId = highestId + 1;
      return `#PRD-${nextId.toString().padStart(3, "0")}`;
    }

    // دالة لإضافة منتج إلى الجدول
    function addProductToTable(product) {
      const tableBody = document.querySelector(".products-table tbody");
      const newRow = document.createElement("tr");

      // تحديد الحالة بناءً على المخزون
      let status = "In Stock";
      let statusClass = "completed";

      if (product.stock === 0) {
        status = "Out of Stock";
        statusClass = "cancelled";
      } else if (product.stock < 15) {
        status = "Low Stock";
        statusClass = "pending";
      }

      newRow.innerHTML = `
                <td>${product.id}</td>
                <td><img src="${
                  product.image
                }" alt="Product" class="product-thumbnail"></td>
                <td>${product.name}</td>
                <td>${
                  product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)
                }</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="status ${statusClass}">${status}</span></td>
                <td>
                    <button class="btn-action edit"><i class="fas fa-edit"></i></button>
                    <button class="btn-action delete"><i class="fas fa-trash"></i></button>
                </td>
            `;

      // إضافة إلى الجدول
      tableBody.appendChild(newRow);

      // إضافة مستمعي الأحداث للأزرار الجديدة
      const editBtn = newRow.querySelector(".btn-action.edit");
      const deleteBtn = newRow.querySelector(".btn-action.delete");

      editBtn.addEventListener("click", function () {
        const row = this.closest("tr");
        const productId = row.querySelector("td:first-child").textContent;
        const productName = row.querySelector("td:nth-child(3)").textContent;
        const productCategory =
          row.querySelector("td:nth-child(4)").textContent;
        const productPrice = parseFloat(
          row.querySelector("td:nth-child(5)").textContent.replace("$", "")
        );
        const productStock = parseInt(
          row.querySelector("td:nth-child(6)").textContent
        );
        const productImage = row.querySelector("img").src;

        // إنشاء وعرض نافذة تعديل المنتج
        showEditProductModal(
          row,
          productId,
          productName,
          productCategory,
          productPrice,
          productStock,
          productImage
        );
      });

      deleteBtn.addEventListener("click", function () {
        const row = this.closest("tr");
        const productId = row.querySelector("td:first-child").textContent;
        if (confirm(`Are you sure you want to delete product ${productId}?`)) {
          row.remove();
          // هنا سترسل طلب واجهة برمجة التطبيقات لحذف المنتج
        }
      });
    }

    // دالة لعرض الإشعارات
    function showNotification(message) {
      // إنشاء عنصر الإشعار
      const notification = document.createElement("div");
      notification.className = "notification";
      notification.textContent = message;

      // إضافة إلى DOM
      document.body.appendChild(notification);

      // عرض الإشعار
      setTimeout(() => {
        notification.classList.add("show");
      }, 10);

      // إخفاء وإزالة بعد 3 ثوانٍ
      setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => {
          notification.remove();
        }, 300);
      }, 3000);
    }

    // دالة لعرض نافذة تعديل المنتج
    function showEditProductModal(
      row,
      productId,
      productName,
      productCategory,
      productPrice,
      productStock,
      productImage
    ) {
      // إنشاء نافذة منبثقة لتعديل المنتج
      const modal = document.createElement("div");
      modal.className = "modal";
      modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Edit Product</h2>
                        <span class="close">&times;</span>
                    </div>
                    <div class="modal-body">
                        <form id="edit-product-form">
                            <div class="form-group">
                                <label for="product-name">Product Name</label>
                                <input type="text" id="product-name" value="${productName}" required>
                            </div>
                            <div class="form-group">
                                <label for="product-category">Category</label>
                                <select id="product-category" required>
                                    <option value="shoes" ${
                                      productCategory === "Shoes"
                                        ? "selected"
                                        : ""
                                    }>Shoes</option>
                                    <option value="clothing" ${
                                      productCategory === "Clothing"
                                        ? "selected"
                                        : ""
                                    }>Clothing</option>
                                    <option value="accessories" ${
                                      productCategory === "Accessories"
                                        ? "selected"
                                        : ""
                                    }>Accessories</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="product-price">Price ($)</label>
                                <input type="number" id="product-price" step="0.01" min="0" value="${productPrice}" required>
                            </div>
                            <div class="form-group">
                                <label for="product-stock">Stock Quantity</label>
                                <input type="number" id="product-stock" min="0" value="${productStock}" required>
                            </div>
                            <div class="form-group">
                                <label for="product-image">Current Image</label>
                                <div class="current-image-preview">
                                    <img src="${productImage}" alt="Product" style="max-width: 100px; display: block; margin-bottom: 10px;">
                                </div>
                                <input type="text" id="product-image" value="${productImage}" placeholder="image-daw/product.png">
                            </div>
                            <div class="form-group">
                                <label>Upload New Image</label>
                                <div class="file-upload">
                                    <input type="file" id="image-upload" accept="image/*">
                                    <label for="image-upload" class="file-upload-btn">Choose File</label>
                                    <span class="file-name">No file chosen</span>
                                </div>
                                <div class="image-preview" style="margin-top: 10px;"></div>
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn-cancel">Cancel</button>
                                <button type="submit" class="btn-save">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;

      // إضافة النافذة المنبثقة إلى DOM
      document.body.appendChild(modal);

      // عرض النافذة المنبثقة
      setTimeout(() => {
        modal.style.display = "block";
        modal.classList.add("show");
      }, 10);

      // إغلاق النافذة المنبثقة عند النقر على X
      modal.querySelector(".close").addEventListener("click", () => {
        closeModal(modal);
      });

      // إغلاق النافذة المنبثقة عند النقر على زر الإلغاء
      modal.querySelector(".btn-cancel").addEventListener("click", () => {
        closeModal(modal);
      });

      // معالجة تحميل الملفات
      const fileUpload = modal.querySelector("#image-upload");
      const fileName = modal.querySelector(".file-name");
      const imagePreview = modal.querySelector(".image-preview");
      const productImageInput = modal.querySelector("#product-image");

      fileUpload.addEventListener("change", function () {
        if (this.files && this.files[0]) {
          fileName.textContent = this.files[0].name;

          // معاينة الصورة
          const reader = new FileReader();
          reader.onload = function (e) {
            imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width: 100px; max-height: 100px;">`;

            // تحديث مسار الصورة
            productImageInput.value = `image-daw/${fileUpload.files[0].name}`;
          };
          reader.readAsDataURL(this.files[0]);
        }
      });

      // معالجة تقديم النموذج
      const form = modal.querySelector("#edit-product-form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();

        // الحصول على قيم النموذج
        const name = document.getElementById("product-name").value;
        const category = document.getElementById("product-category").value;
        const price = parseFloat(
          document.getElementById("product-price").value
        );
        const stock = parseInt(document.getElementById("product-stock").value);
        const imageUrl = document.getElementById("product-image").value;

        // تحديث الصف في الجدول
        row.querySelector("td:nth-child(3)").textContent = name;
        row.querySelector("td:nth-child(4)").textContent =
          category.charAt(0).toUpperCase() + category.slice(1);
        row.querySelector("td:nth-child(5)").textContent =
          "$" + price.toFixed(2);
        row.querySelector("td:nth-child(6)").textContent = stock;

        // تحديث الصورة إذا تم تغييرها
        if (imageUrl && imageUrl !== productImage) {
          row.querySelector("img").src = imageUrl;
        }

        // تحديث الحالة بناءً على المخزون
        let status = "In Stock";
        let statusClass = "completed";

        if (stock === 0) {
          status = "Out of Stock";
          statusClass = "cancelled";
        } else if (stock < 15) {
          status = "Low Stock";
          statusClass = "pending";
        }

        const statusSpan = row.querySelector(".status");
        statusSpan.textContent = status;
        statusSpan.className = "status " + statusClass;

        // تحديث في localStorage
        updateProductInLocalStorage(productId, {
          id: productId,
          name: name,
          category: category,
          price: price,
          stock: stock,
          image: imageUrl,
        });

        // إغلاق النافذة المنبثقة
        closeModal(modal);

        // عرض إشعار نجاح
        showNotification("Product updated successfully!");
      });
    }

    // دالة لتحديث المنتج في localStorage
    function updateProductInLocalStorage(productId, updatedProduct) {
      let products = JSON.parse(localStorage.getItem("adminProducts")) || [];

      // البحث عن المنتج وإجراء التحديث
      products = products.map((product) => {
        if (product.id === productId) {
          return updatedProduct;
        }
        return product;
      });

      // حفظ التحديثات في localStorage
      localStorage.setItem("adminProducts", JSON.stringify(products));
    }
  }

  // إدارة الطلبات
  if (document.querySelector(".orders-table")) {
    // عرض تفاصيل الطلب
    document
      .querySelectorAll(".orders-table .btn-action.view")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const row = this.closest("tr");
          const orderId = row.querySelector("td:first-child").textContent;//ra9m order
          alert(`View order details for ${orderId}`);
          // هنا ستحتاج إلى فتح نافذة مع تفاصيل الطلب
        });
      });

    // طباعة الطلب
    document
      .querySelectorAll(".orders-table .btn-action.print")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const row = this.closest("tr");
          const orderId = row.querySelector("td:first-child").textContent;
          alert(`Print order ${orderId}`);
          // هنا ستحتاج إلى تشغيل وظيفة الطباعة
        });
      });

    // إلغاء الطلب
    document
      .querySelectorAll(".orders-table .btn-action.cancel")
      .forEach((btn) => {
        btn.addEventListener("click", function () {
          const row = this.closest("tr");
          const orderId = row.querySelector("td:first-child").textContent;
          if (confirm(`Are you sure you want to cancel order ${orderId}?`)) {
            row.remove();
            // هنا سترسل طلب واجهة برمجة التطبيقات لإلغاء الطلب
          }
        });
      });

    // تصفية الطلبات
    document
      .querySelector("#order-status-filter")
      .addEventListener("change", filterOrders);

    function filterOrders() {
      const statusFilter = document
        .querySelector("#order-status-filter")
        .value.toLowerCase();

      document.querySelectorAll(".orders-table tbody tr").forEach((row) => {
        const status = row.querySelector(".status").textContent.toLowerCase();

        const statusMatch = !statusFilter || status.includes(statusFilter);

        if (statusMatch) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    }
  }
});
