// Biến toàn cục
let currentPage = 1;
const productsPerPage = 6;

// Biến toàn cục để lưu phạm vi độ tuổi của danh mục hiện tại
let currentCategoryAgeRange = null;

// Hàm cập nhật danh sách độ tuổi
function updateAgeRange(minAge, maxAge) {
    const ageRangeSelect = document.getElementById('age-range');
    ageRangeSelect.innerHTML = ''; // Xóa các tùy chọn cũ

    // Thêm tùy chọn "----"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '----';
    defaultOption.selected = true;
    ageRangeSelect.appendChild(defaultOption);

    // Thêm các tùy chọn độ tuổi
    for (let i = minAge; i <= maxAge; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i} tuổi`;
        ageRangeSelect.appendChild(option);
    }
}

// Hàm phân trang
function paginateProducts() {
    const products = Array.from(document.querySelectorAll('.product'));
    const visibleProducts = products.filter(product => product.style.display !== 'none'); // Chỉ lấy sản phẩm hiển thị
    const totalPages = Math.ceil(visibleProducts.length / productsPerPage);

    // Ẩn tất cả sản phẩm trước
    products.forEach(product => (product.style.display = 'none'));

    // Hiển thị sản phẩm của trang hiện tại
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    visibleProducts.slice(startIndex, endIndex).forEach(product => (product.style.display = 'block'));

    // Tạo phân trang
    const paginationContainer = document.querySelector('.pagination');
    paginationContainer.innerHTML = ''; // Xóa nội dung cũ

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('span');
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? 'active' : '';
        pageButton.onclick = () => {
            currentPage = i;
            paginateProducts();
        };
        paginationContainer.appendChild(pageButton);
    }

    // Ẩn phân trang nếu chỉ có 1 trang
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
    } else {
        paginationContainer.style.display = 'block';
    }
}
currentPage = 1;

// Hàm tìm kiếm sản phẩm
function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productName = product.querySelector('.product-name')?.textContent.toLowerCase() || '';
        product.style.display = productName.includes(query) ? 'block' : 'none';
    });

    // Cập nhật breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = '<span>Chức năng</span> > <span>Trang chủ</span>';

    // Cập nhật phân trang
    currentPage = 1; // Reset về trang đầu tiên
    paginateProducts();
}

// Hàm lọc sản phẩm theo độ tuổi và nhãn hiệu
function filterProducts() {
    const priceMinInput = document.getElementById('price-min');
    const priceMaxInput = document.getElementById('price-max');
    const priceMin = parseInt(priceMinInput.value) || 0;
    const priceMax = parseInt(priceMaxInput.value) || Infinity;

    // Kiểm tra điều kiện giá
    if (priceMin < 0 ) {
        alert("Giá không được âm!");
        priceMinInput.focus();
        priceMaxInput.focus();
        return;
    }

    if (priceMax < 0) {
        alert("Giá không được âm!");
        priceMaxInput.focus();
        return;
    }

    if (priceMin > priceMax) {
        alert("Giá từ phải nhỏ hơn hoặc bằng Giá đến!");
        priceMinInput.focus();
        return;
    }

    const selectedAge = document.getElementById('age-range').value;
    const selectedBrand = document.getElementById('brand-filter').value;
    const selectedType = document.getElementById('type-filter').value;
    const products = Array.from(document.querySelectorAll('.product'));

    // Lọc sản phẩm dựa trên tiêu chí
    let filteredProducts = products.filter(product => {
        const productAge = product.querySelector('.product-age')?.dataset.age || '';
        const productBrand = product.querySelector('.product-brand')?.textContent.trim() || '';
        const productType = product.querySelector('.product-type')?.textContent.trim() || '';
        const productPrice = getPrice(product);
        const [minAge, maxAge] = productAge.split('-').map(Number);

        let isVisible = true;

        // Kiểm tra phạm vi độ tuổi của danh mục hiện tại
        if (currentCategoryAgeRange) {
            const [categoryMinAge, categoryMaxAge] = currentCategoryAgeRange.split('-').map(Number);
            isVisible = isVisible && minAge <= categoryMaxAge && maxAge >= categoryMinAge;
        }

        // Kiểm tra độ tuổi được chọn
        if (selectedAge) {
            isVisible = isVisible && minAge <= selectedAge && maxAge >= selectedAge;
        }

        // Kiểm tra nhãn hiệu
        if (selectedBrand) {
            isVisible = isVisible && productBrand === selectedBrand;
        }

        // Kiểm tra dạng
        if (selectedType) {
            isVisible = isVisible && productType === selectedType;
        }

        // Kiểm tra khoảng giá
        isVisible = isVisible && productPrice >= priceMin && productPrice <= priceMax;

        return isVisible;
    });

    // Hiển thị sản phẩm
    products.forEach(product => (product.style.display = 'none')); // Ẩn tất cả sản phẩm
    filteredProducts.forEach(product => (product.style.display = 'block')); // Hiển thị sản phẩm phù hợp

    // Hiển thị thông báo nếu không có sản phẩm phù hợp
    const noProductsMessage = document.getElementById('no-products-message');
    noProductsMessage.style.display = filteredProducts.length === 0 ? 'block' : 'none';

    // Cập nhật phân trang
    currentPage = 1; // Reset về trang đầu tiên
    paginateProducts();
}

// Hàm lấy giá trị giá sản phẩm
function getPrice(product) {
    return parseInt(product.querySelector('.product-price').textContent.replace(/[^\d]/g, '')) || 0;
}

// Hàm hiển thị sản phẩm theo danh mục
function showCategoryProducts(category, range) {
    const productList = document.querySelectorAll('.product');
    const [minAge, maxAge] = range.split('-').map(Number);

    // Lưu phạm vi độ tuổi của danh mục hiện tại
    currentCategoryAgeRange = range;

    // Lọc và hiển thị sản phẩm theo độ tuổi
    productList.forEach(product => {
        const productAgeText = product.querySelector('.product-age')?.dataset.age;
        if (productAgeText) {
            const [productMinAge, productMaxAge] = productAgeText.split('-').map(Number);
            if (productMinAge <= maxAge && productMaxAge >= minAge) {
                product.style.display = 'block'; // Hiển thị sản phẩm phù hợp
            } else {
                product.style.display = 'none'; // Ẩn sản phẩm không phù hợp
            }
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm không có độ tuổi
        }
    });

    // Cập nhật danh sách độ tuổi
    updateAgeRange(minAge, maxAge);

    // Cập nhật breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = `<span>Chức năng</span> > <span>Phân Loại</span> > <span>${category}</span>`;
}

// Hàm hiển thị tất cả sản phẩm (XÓA)
function showAllProducts() {
    const products = document.querySelectorAll('.product');
    products.forEach(product => (product.style.display = 'block'));

    // Reset các bộ lọc
    document.getElementById('age-range').value = '';
    document.getElementById('brand-filter').value = '';
    document.getElementById('type-filter').value = '';

    // Cập nhật breadcrumb
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = '<span>Chức năng</span> > <span>Trang chủ</span>';

    // Cập nhật phân trang
    currentPage = 1;
    paginateProducts();
}

function toggleSubmenu(parent) {
    const submenu = parent.querySelector('.submenu');
    if (submenu) {
        submenu.classList.toggle('open');
    }
}

function updateBrandFilter() {
    const brandFilter = document.getElementById('brand-filter');
    const products = document.querySelectorAll('.product');
    const brands = new Set();

    // Lấy danh sách nhãn hiệu từ các sản phẩm
    products.forEach(product => {
        const brand = product.querySelector('.product-brand')?.textContent.trim();
        if (brand) {
            brands.add(brand);
        }
    });

    // Xóa các tùy chọn cũ
    brandFilter.innerHTML = '';

    // Thêm tùy chọn "----"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '----';
    defaultOption.selected = true;
    brandFilter.appendChild(defaultOption);

    // Thêm các nhãn hiệu vào dropdown
    brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        brandFilter.appendChild(option);
    });
}

function updateTypeFilter() {
    const typeFilter = document.getElementById('type-filter');
    const products = document.querySelectorAll('.product');
    const types = new Set();

    // Lấy danh sách dạng sản phẩm từ các sản phẩm
    products.forEach(product => {
        const type = product.querySelector('.product-type')?.textContent.trim();
        if (type) {
            types.add(type);
        }
    });

    // Xóa các tùy chọn cũ
    typeFilter.innerHTML = '';

    // Thêm tùy chọn "----"
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '----';
    defaultOption.selected = true;
    typeFilter.appendChild(defaultOption);

    // Thêm các dạng sản phẩm vào dropdown
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateBrandFilter();
    updateTypeFilter();
});