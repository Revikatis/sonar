import { useEffect, useState } from 'react';
import Link from 'next/link';



let UUid = 0;
function getId() {
    return UUid++ + '';
}

const PRODUCTS = [{ Category: 'kategoria', Price: '0', Name: 'nazwa' }];

let dataFetched = false;

export default function App() {
    const [productData, setProductData] = useState();

    let data = PRODUCTS;

    const getApiData = async () => {
        const response = await fetch('api/products').then(response => response.json());
        setProductData(response);
    };

    useEffect(() => {
        getApiData();
        dataFetched = true;
    }, []);

    if (dataFetched) {
        data = productData;
    }

    const [koszykProducts, updateKoszyk] = useState([]);
    const [sum, setSum] = useState(0);

    const AddToKoszyk = product => {
        const cart = [
            ...koszykProducts,
            { id: getId(), Price: product.Price, Name: product.Name },
        ];
        updateKoszyk(cart);
        setSum(
            cart.reduce((total, product) => {
                return total + parseInt(product.Price);
            }, 0),
        );
    };
    const DeleteFromKoszyk = product => {
        const cart = koszykProducts.filter(val => {
            return val.id != product.id;
        });
        updateKoszyk(cart);
        setSum(
            cart.reduce((total, product) => {
                return total + parseInt(product.Price);
            }, 0),
        );
    };

    return (
        <div>
            <h1 className="title">
                <Link href="/post">link</Link>
                <Link href="/form">test form</Link>
            </h1>
            <ProductTable AddToKoszyk={AddToKoszyk} products={data} />
            <Koszyk
                DeleteFromKoszyk={DeleteFromKoszyk}
                products={koszykProducts}
                sum={sum}
            />
        </div>
    );
}
//  <Payment                                                            sum={sum}/>

function ProductTable({ products, AddToKoszyk }) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if (product.Category !== lastCategory) {
            rows.push(
                <ProductCategoryRow
                    category={product.Category}
                    key={product.Category}
                />,
            );
        }
        rows.push(
            <ProductRow
                buttonText="Dodaj do koszyka"
                key={product.Name}
                product={product}
                updateKoszyk={AddToKoszyk}
            />,
        );
        lastCategory = product.Category;
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

function ProductCategoryRow({ category }) {
    return (
        <tr>
            <th className="thCategory" colSpan="2">
                {category}
            </th>
        </tr>
    );
}

function ProductRow({ product, buttonText, updateKoszyk }) {
    return (
        <tr>
            <td>{product.Name}</td>
            <td>{product.Price}zł</td>
            <td>
                {' '}
                <button
                    className="productB"
                    onClick={() => updateKoszyk(product)}
                >
                    {buttonText}
                </button>
            </td>
        </tr>
    );
}

function Koszyk({ products, DeleteFromKoszyk, sum }) {
    return (
        <div>
            <h2>Koszyk</h2>
            <KoszykTable
                DeleteFromKoszyk={DeleteFromKoszyk}
                products={products}
            />
            <div id="kSuma">suma: {sum}zł </div>
        </div>
    );
}

function KoszykTable({ products, DeleteFromKoszyk }) {
    const rows = [];
    products.forEach(product => {
        rows.push(
            <ProductRow
                buttonText="usuń"
                key={product.id}
                product={product}
                updateKoszyk={DeleteFromKoszyk}
            />,
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}