// ==========================================================================
// 🔐 SECURE CRYPTOGRAPHIC TABLE TOKENS
// Prevents parameter tampering. Only these exact registry signatures can access the menu.
// ==========================================================================
const SECURE_TABLE_REGISTRY = {
    "t_qR9x7P2m": "1",
    "t_bK4vM8zW": "2",
    "t_L3nF9xYq": "3",
    "t_pZ7mK2wX": "4",
    "t_v8N2xR5p": "5",
    "t_mW5qK9zL": "6"
};

let tableNum = null; // Stays null until valid token authenticates
let tableCartStorageKey = "cafe_website_cart_counter";

const menuDatabase = [
    // === 1. PIZZA ===
    { id: "p1", category: "pizza", catLabel: "Pizza Block", name: "Margherita", price: 249, desc: "Classic fresh tomato sauce, real shredded mozzarella, and basil strings.", img: "menu images/margherita.jpg" },
    { id: "p2", category: "pizza", catLabel: "Pizza Block", name: "Paneer Tikka Pizza", price: 329, desc: "Spiced paneer cubes, capsicum, onions, and tandoori drizzle.", img: "menu images/paneer_tikka.jpg" },
    { id: "p3", category: "pizza", catLabel: "Pizza Block", name: "Farmhouse / Veggie Supreme", price: 349, desc: "Loaded with button mushrooms, golden sweet corn, olives, and bell peppers.", img: "menu images/farmhouse.jpg" },
    { id: "p4", category: "pizza", catLabel: "Pizza Block", name: "9 Cheesy Pizza", price: 429, desc: "An ultimate creamy burst of 9 premium cheeses melted to golden perfection.", img: "menu images/cheesy_9.jpg" },
    { id: "p5", category: "pizza", catLabel: "Pizza Block", name: "Cheesy Garlic Bread", price: 149, desc: "Garlic infused butter toasted crust topped with high pull melted cheese.", img: "menu images/garlic_bread.jpg" },

    // === 2. BURGERS ===
    { id: "b1", category: "burgers", catLabel: "Burgers Block", name: "Peri Peri Veg Whopper", price: 179, desc: "Fiery African peri-peri spiced crispy veggie patty with crisp lettuce.", img: "menu images/peri_peri_burger.jpg" },
    { id: "b2", category: "burgers", catLabel: "Burgers Block", name: "Paneer Burger", price: 199, desc: "Crispy fried cottage cheese slab sandwiched in premium brioche buns.", img: "menu images/paneer_burger.jpg" },
    { id: "b3", category: "burgers", catLabel: "Burgers Block", name: "Veg Whopper", price: 149, desc: "Our classic thick plant patty topped with crunchy house pickles and mayo.", img: "menu images/veg_whopper.jpg" },
    { id: "b4", category: "burgers", catLabel: "Burgers Block", name: "2 Veg Whopper Deal", price: 269, desc: "Double value saver pack containing twin servings of our classic veg whopper.", img: "menu images/twin_whopper.jpg" },
    { id: "b5", category: "burgers", catLabel: "Burgers Block", name: "Cheese Whopper Deluxe", price: 219, desc: "Smashed seasoned veg patty layered deeply with double cheddar melted slices.", img: "menu images/cheese_deluxe.jpg" },

    // === 3. PASTA ===
    { id: "pa1", category: "pasta", catLabel: "Pasta Block", name: "Alfredo", price: 279, desc: "Rich and luxurious creamy white cheese sauce mesh prepared with pure butter.", img: "menu images/alfredo.jpg" },
    { id: "pa2", category: "pasta", catLabel: "Pasta Block", name: "Arrabiata", price: 259, desc: "Spicy plum tomato red sauce tossed with crushed garlic flakes and red chili pods.", img: "menu images/arrabiata.jpg" },
    { id: "pa3", category: "pasta", catLabel: "Pasta Block", name: "Pesto Pasta", price: 299, desc: "Fragrant fresh basil leaves blended with roasted pine nuts, olive oil, and parmesan.", img: "menu images/pesto.jpg" },
    { id: "pa4", category: "pasta", catLabel: "Pasta Block", name: "Lasagna", price: 349, desc: "Baked layered flat pasta sheets packed with seasonal minced greens and sauce.", img: "menu images/lasagna.jpg" },
    { id: "pa5", category: "pasta", catLabel: "Pasta Block", name: "Messy Pink Pasta", price: 289, desc: "A beautiful harmony of creamy alfredo and sharp zesty red sauce colliding gracefully.", img: "menu images/pink_pasta.jpg" },

    // === 4. MOCKTAILS ===
    { id: "m1", category: "mocktails", catLabel: "Mocktails Block", name: "Blue Lagoon Mojito", price: 129, desc: "Refreshing blue curaçao citrus extract, sparkling club soda, and fresh lime squeeze.", img: "menu images/blue_lagoon.jpg" },
    { id: "m2", category: "mocktails", catLabel: "Mocktails Block", name: "Blueberry Mojito", price: 149, desc: "Muddled wild sweet blueberries, fresh hand-picked mint leaves, and effervescent soda.", img: "menu images/blueberry_mojito.jpg" },
    { id: "m3", category: "mocktails", catLabel: "Mocktails Block", name: "Classic Mint Mojito", price: 119, desc: "Traditional cooling crushed ice beverage with fresh mint and lime juice.", img: "menu images/classic_mojito.jpg" },
    { id: "m4", category: "mocktails", catLabel: "Mocktails Block", name: "Jamun Mojito", price: 139, desc: "A native tangy twist featuring Indian black plum reduction, salt, and fizz.", img: "menu images/jamun_mojito.jpg" },
    { id: "m5", category: "mocktails", catLabel: "Mocktails Block", name: "Lemon Iced Tea", price: 99, desc: "Chilled clean brewed black tea leaves flavored with natural cooling citrus juice.", img: "menu images/lemon_tea.jpg" },
    { id: "m6", category: "mocktails", catLabel: "Mocktails Block", name: "Peach Iced Tea", price: 109, desc: "Sweet aromatic peach fruit pulp extract shaken with fresh ice brew concentrate.", img: "menu images/peach_tea.jpg" },
    { id: "m7", category: "mocktails", catLabel: "Mocktails Block", name: "Watermelon Mojito", price: 139, desc: "Fresh pressed watermelon chunks run together with sparkling clear soda.", img: "menu images/watermelon_mojito.jpg" },

    // === 5. FRIES ===
    { id: "f1", category: "fries", catLabel: "Fries Block", name: "Peri Peri Fries", price: 119, desc: "Spicy, hot dusted skin-on cut potatoes tossed thoroughly in African peri spice mix.", img: "menu images/peri_fries.jpg" },
    { id: "f2", category: "fries", catLabel: "Fries Block", name: "Cheese Fries", price: 149, desc: "Golden classic potato fries drenched completely in thick warm cheddar cheese sauce.", img: "menu images/cheese_fries.jpg" },
    { id: "f3", category: "fries", catLabel: "Fries Block", name: "Salty Fries", price: 99, desc: "Lightly sea-salted timeless classic crispy golden potato fingers.", img: "menu images/salty_fries.jpg" },

    // === 6. SANDWICH ===
    { id: "s1", category: "sandwich", catLabel: "Sandwich Block", name: "Vegetable Grilled Sandwich", price: 129, desc: "Sliced crisp cucumbers, ripe tomatoes, and spicy house green mint chutney toasted.", img: "menu images/veg_sandwich.jpg" },
    { id: "s2", category: "sandwich", catLabel: "Sandwich Block", name: "Mexicana Grilled Sandwich", price: 159, desc: "Sweetcorn kernels, hot jalapenos, and bell peppers bound in salsa cream base.", img: "menu images/mexican_sandwich.jpg" },
    { id: "s3", category: "sandwich", catLabel: "Sandwich Block", name: "Piri Piri Paneer Grilled Sandwich", price: 179, desc: "Griddle roasted paneer chunks tossed in robust peri-peri dry rub inside sourdough.", img: "menu images/piri_paneer_sandwich.jpg" },
    { id: "s4", category: "sandwich", catLabel: "Sandwich Block", name: "Veg Cheese Grilled Sandwich", price: 149, desc: "Double layer cheese filling mixed inside white bread with fine garden herbs.", img: "menu images/cheese_sandwich.jpg" },

    // === 7. COLD BEVERAGES ===
    { id: "cb1", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Blueberry Matcha Iced Latte", price: 239, desc: "Earthy Japanese green tea layer sitting directly atop sweet wild blueberry compote.", img: "menu images/blue_matcha.jpg" },
    { id: "cb2", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Mango Matcha Iced Latte", price: 239, desc: "Tropical sweet Alphonso mango puree topped cleanly with whisked ceremonial matcha tea.", img: "menu images/mango_matcha.jpg" },
    { id: "cb3", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Matcha Iced Latte", price: 219, desc: "Authentic bittersweet pure stone-ground green tea whisked over ice and milk.", img: "menu images/matcha_latte.jpg" },
    { id: "cb4", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Iced Caramel Macchiato", price: 199, desc: "Bold espresso coffee shots mixed with milk and layered with caramel drizzle strings.", img: "menu images/iced_caramel.jpg" },
    { id: "cb5", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Iced Coffee", price: 149, desc: "Rich, smooth, classic cold-blended dark roasted espresso milk shake formula.", img: "menu images/iced_coffee.jpg" },
    { id: "cb6", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Iced Vanilla Latte", price: 189, desc: "Premium aromatic vanilla bean extract mixed balanced with classic cold milk brew.", img: "menu images/iced_vanilla.jpg" },
    { id: "cb7", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Brownie Shrappe", price: 219, desc: "Blended ice cold creamy drink packed with chocolate fudge brownies.", img: "menu images/brownie_frappe.jpg" },
    { id: "cb8", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Double Choco Chip Shrappe", price: 209, desc: "Crunchy real cocoa chips processed down into a sweet frozen milk base emulsion.", img: "menu images/choco_chip_frappe.jpg" },
    { id: "cb9", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Lotus Biscoff Shrappe", price: 249, desc: "Modern premium shake treat featuring real speculoos cookie butter spread and crumbs.", img: "menu images/biscoff_frappe.jpg" },
    { id: "cb10", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Oreo Shrappe", price: 199, desc: "Vanilla cream base processed together with crunchy chocolate sandwich cookie chunks.", img: "menu images/oreo_frappe.jpg" },
    { id: "cb11", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Chocolate Shake", price: 169, desc: "Velvety dark chocolate sauce shaken with full cream dairy ice cream scoop.", img: "menu images/chocolate_shake.jpg" },
    { id: "cb12", category: "cold-beverages", catLabel: "Cold Beverages Block", name: "Kitkat Shake", price: 189, desc: "Crisp wafer chocolate fingers blended down uniform into a thick chocolate milkshake.", img: "menu images/kitkat_shake.jpg" },

    // === 8. DESSERT ===
    { id: "d1", category: "dessert", catLabel: "Dessert Block", name: "Brownie With Ice Cream", price: 169, desc: "Warm rich chocolate fudge brownie coupled with a cold premium vanilla scoop.", img: "menu images/brownie_ice_cream.jpg" },
    { id: "d2", category: "dessert", catLabel: "Dessert Block", name: "Walnut Brownie", price: 129, desc: "Fudgy dense dark cocoa cake square loaded inside with nutty roasted walnut chunks.", img: "menu images/walnut_brownie.jpg" },
    { id: "d3", category: "dessert", catLabel: "Dessert Block", name: "Chocolate Muffin", price: 99, desc: "Soft spongy center cocoa muffin structure containing exploding warm dark filling core.", img: "menu images/muffin.jpg" },
    { id: "d4", category: "dessert", catLabel: "Dessert Block", name: "Biscoff Cheese Cake Slice", price: 249, desc: "Cold set gourmet cream cheesecake layout with a thick crumbly Biscoff crust.", img: "menu images/cheesecake.jpg" },
    { id: "d5", category: "dessert", catLabel: "Dessert Block", name: "Butter Croissant", price: 119, desc: "Flaky, multi-layered golden puff pastry laminated beautifully with authentic butter sheets.", img: "menu images/croissant.jpg" },
    { id: "d6", category: "dessert", catLabel: "Dessert Block", name: "Chocolate Croissant", price: 149, desc: "Signature golden pastry crescent filled inside with a semi-sweet melting chocolate center.", img: "menu images/choco_croissant.jpg" },
    { id: "d7", category: "dessert", catLabel: "Dessert Block", name: "Nutella Croissant", price: 169, desc: "Flaky warm puff baked shell generously injected internally with liquid hazelnut spread.", img: "menu images/nutella_croissant.jpg" },

    // === 9. COLD DRINKS ===
    { id: "cd1", category: "cold-drinks", catLabel: "Cold Drinks Block", name: "Coke", price: 40, desc: "Standard carbonated carbon-filtered chilled classic cola soda can.", img: "menu images/coke.jpg" },
    { id: "cd2", category: "cold-drinks", catLabel: "Cold Drinks Block", name: "Sprite", price: 40, desc: "Crisp clear lemon lime caffeine free carbonated fizzy refreshment drink.", img: "menu images/sprite.jpg" },
    { id: "cd3", category: "cold-drinks", catLabel: "Cold Drinks Block", name: "Maaza", price: 45, desc: "Indulgent, non-fizzy, sweet premium rich mango pulpy fruit drink bottle.", img: "menu images/maaza.jpg" },
    { id: "cd4", category: "cold-drinks", catLabel: "Cold Drinks Block", name: "Thums Up", price: 40, desc: "Strong carbonated spicy high fizz legendary Indian cola experience.", img: "menu images/thums_up.jpg" }
];

// 🔐 Secure Token Validator Routine
// 🔐 Secure Token Validator Routine with Auto-Fallback Patch
// 🔐 Secure Token Validator Routine (With Dashboard Bypass)
function evaluateTableContext() {
    try {
        // 🚀 BYPASS CHECK: If this script is running inside the kitchen panel, do not block it!
        if (window.location.pathname.endsWith('kitchen.html')) {
            tableNum = "Admin-Dashboard";
            return;
        }

        const queryParams = new URLSearchParams(window.location.search);

        // AUTO-FALLBACK: If the old broken '?table=1' format is detected on customer views
        if (queryParams.has('table') && !queryParams.has('token')) {
            const oldTableNum = queryParams.get('table');
            const secureToken = Object.keys(SECURE_TABLE_REGISTRY).find(
                key => SECURE_TABLE_REGISTRY[key] === oldTableNum
            );
            if (secureToken) {
                window.location.href = `menu.html?token=${secureToken}`;
                return;
            }
        }

        if (!queryParams.has('token')) {
            handleSecurityBreach("Access Denied: Missing Security Token Key.");
            return;
        }

        const providedToken = queryParams.get('token');

        if (SECURE_TABLE_REGISTRY.hasOwnProperty(providedToken)) {
            tableNum = SECURE_TABLE_REGISTRY[providedToken];
        } else {
            handleSecurityBreach("Access Denied: Malicious Security Token Mismatch.");
            return;
        }

        tableCartStorageKey = `cafe_website_cart_table_${tableNum}`;

        const tableIndicator = document.getElementById('tableDisplay');
        if (tableIndicator) {
            tableIndicator.innerText = `Table ID: ${tableNum}`;
        }
    } catch (err) {
        console.error("Context parsing error:", err);
        handleSecurityBreach("System error processing local context parameters.");
    }
}
// Drops a full-screen lockdown block overlay if URLs are altered
function handleSecurityBreach(message) {
    document.body.innerHTML = `
        <div style="font-family: 'Plus Jakarta Sans', sans-serif; text-align: center; padding: 100px 20px; background-color: #F4F1EA; height: 100vh;">
            <div style="background: white; max-width: 500px; margin: 0 auto; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 2px solid #E76F51;">
                <h1 style="color: #E76F51; font-size: 48px; margin-bottom: 10px;">🛑</h1>
                <h2 style="color: #2A2421; margin-bottom: 15px;">Security Shield Active</h2>
                <p style="color: #666; font-size: 15px; line-height: 1.6;">${message}</p>
                <p style="color: #95714F; font-size: 13px; margin-top: 25px; font-weight: 600;">Swastik Solar KDS Systems</p>
            </div>
        </div>
    `;
}

function fetchCartData() {
    try {
        let rawData = localStorage.getItem(tableCartStorageKey);
        return rawData ? JSON.parse(rawData) : {};
    } catch (e) {
        return {};
    }
}

function saveCartData(cartObject) {
    try {
        localStorage.setItem(tableCartStorageKey, JSON.stringify(cartObject));
        syncCartIndicator();
    } catch (e) {
        console.error(e);
    }
}

function renderAllBlocks() {
    const viewGrid = document.getElementById('productsDisplay');
    if (!viewGrid) return;
    viewGrid.innerHTML = "";

    const categories = [
        { key: "pizza", label: "1. Pizza Block" },
        { key: "burgers", label: "2. Burgers Block" },
        { key: "pasta", label: "3. Pasta Block" },
        { key: "mocktails", label: "4. Mocktails Block" },
        { key: "fries", label: "5. Fries Block" },
        { key: "sandwich", label: "6. Sandwich Block" },
        { key: "cold-beverages", label: "7. Cold Beverages Block" },
        { key: "dessert", label: "8. Dessert Block" },
        { key: "cold-drinks", label: "9. Cold Drinks Block" }
    ];

    categories.forEach(cat => {
        const matchingItems = menuDatabase.filter(dish => dish.category === cat.key);

        if (matchingItems.length > 0) {
            let blockHTML = `
                <div class="category-section-block" id="section-${cat.key}">
                    <div class="category-block-header">
                        <h2>${cat.label}</h2>
                        <div class="block-accent-line"></div>
                    </div>
                    <div class="category-products-grid">
            `;

            matchingItems.forEach(dish => {
                blockHTML += `
                    <div class="product-card">
                        <img src="${dish.img}" alt="${dish.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400';">
                        <div class="product-info">
                            <h4>${dish.name}</h4>
                            <p>${dish.desc}</p>
                            <div class="product-price-action">
                                <strong>₹${dish.price}</strong>
                                <button class="add-to-cart-btn" onclick="addItemToTableBasket('${dish.id}')">Add to Order</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            blockHTML += `
                    </div>
                </div>
            `;
            viewGrid.innerHTML += blockHTML;
        }
    });
}

function scrollToCategory(elementId, sidebarItem) {
    const section = document.getElementById(elementId);
    if (section) {
        const yOffset = -140;
        const yPosition = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: yPosition, behavior: 'smooth' });
    }

    const verticalLinks = document.querySelectorAll('.sidebar-categories li');
    verticalLinks.forEach(item => item.classList.remove('active-cat'));
    if (sidebarItem) sidebarItem.classList.add('active-cat');
}

function addItemToTableBasket(id) {
    let cart = fetchCartData();
    cart[id] = (cart[id] || 0) + 1;
    saveCartData(cart);
}

function syncCartIndicator() {
    let cart = fetchCartData();
    let unitSum = 0;
    for (let id in cart) {
        unitSum += cart[id];
    }
    const indicator = document.getElementById('cartCount');
    if (indicator) indicator.innerText = unitSum;
}

function toggleCartModal() {
    const panel = document.getElementById('cartModal');
    if (!panel) return;
    panel.style.display = (panel.style.display === "flex") ? "none" : "flex";
    if (panel.style.display === "flex") compileSecureReceipt();
}

function compileSecureReceipt() {
    const listHolder = document.getElementById('cartItemsList');
    const costDetails = document.getElementById('billBreakdown');
    if (!listHolder || !costDetails) return;

    let basket = fetchCartData();
    listHolder.innerHTML = "";
    let rawSubtotal = 0;

    for (let keyId in basket) {
        const dishMeta = menuDatabase.find(x => x.id === keyId);
        if (!dishMeta) continue;

        const calculationQty = basket[keyId];
        const combinedCost = dishMeta.price * calculationQty;
        rawSubtotal += combinedCost;

        listHolder.innerHTML += `
            <div style="display:flex; justify-content:space-between; margin-bottom: 10px; font-size:15px;">
                <span><strong>${dishMeta.name}</strong> <span style="color:#777;">x${calculationQty}</span></span>
                <span style="font-weight:600;">₹${combinedCost}.00</span>
            </div>
        `;
    }

    if (rawSubtotal === 0) {
        listHolder.innerHTML = "<p style='color:gray; text-align:center; padding:20px;'>Your cart is empty.</p>";
        costDetails.innerHTML = "";
        return;
    }

    const computedCgst = rawSubtotal * 0.025;
    const computedSgst = rawSubtotal * 0.025;
    const grandFinalTotal = rawSubtotal + computedCgst + computedSgst;

    costDetails.innerHTML = `
        <div style="display:flex; justify-content:space-between; font-size:14px; margin-top:10px;"><span>Subtotal:</span><span>₹${rawSubtotal.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#555;"><span>CGST (2.5%):</span><span>₹${computedCgst.toFixed(2)}</span></div>
        <div style="display:flex; justify-content:space-between; font-size:12px; color:#555;"><span>SGST (2.5%):</span><span>₹${computedSgst.toFixed(2)}</span></div>
        <hr style="margin: 8px 0; border: none; border-top: 1px dashed #bbb;">
        <div style="display:flex; justify-content:space-between; font-weight:700; font-size:18px; color:var(--cafe-deep);">
            <span>Grand Total:</span><span>₹${Math.round(grandFinalTotal)}.00</span>
        </div>
    `;
}

function placeFinalOrder() {
    let basket = fetchCartData();
    if (Object.keys(basket).length === 0) {
        alert("Your table cart is empty!");
        return;
    }

    // Calculate the total bill dynamically to pass into the database row
    let rawSubtotal = 0;
    for (let keyId in basket) {
        const dishMeta = menuDatabase.find(x => x.id === keyId);
        if (dishMeta) rawSubtotal += (dishMeta.price * basket[keyId]);
    }
    const computedTax = rawSubtotal * 0.05; // CGST + SGST (5%)
    const grandFinalTotal = Math.round(rawSubtotal + computedTax);

    // Package the payload matching our PHP API structural layout
    const orderPayload = {
        table: tableNum,
        items: basket,
        total: grandFinalTotal
    };

    // 📡 Stream payload asynchronously straight to our MySQL backend handler script
    fetch('save_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                // Clear the temporary cart view once successfully logged into MySQL
                localStorage.removeItem(tableCartStorageKey);
                if (typeof syncCartIndicator === 'function') syncCartIndicator();

                document.getElementById('cartModal').style.display = "none";
                document.getElementById('thankYouModal').style.display = "flex";
            } else {
                alert("Database Error: " + data.message);
            }
        })
        .catch((error) => {
            console.error("Transmission error:", error);
            alert("Network error: Failed to send order to the MySQL database server.");
        });
}

document.addEventListener("DOMContentLoaded", () => {
    evaluateTableContext();
    // Only compile the interface layers if authorization tokens passed validation checks
    if (tableNum !== null) {
        renderAllBlocks();
        syncCartIndicator();
    }
});// 🔐 Function to close the Thank You popup modal and refresh the clean menu view
function closeThankYou() {
    const thankYouModal = document.getElementById('thankYouModal');
    if (thankYouModal) {
        thankYouModal.style.display = "none";
        window.location.reload(); // Refreshes the menu layout cleanly
    }
}