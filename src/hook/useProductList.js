import { useState, useEffect } from "react"
import {
    getFirestore,
    getDocs,
    where,
    collection,
    query,
} from 'firebase/firestore';

export const useProductList = (id) => {
    const [productos, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const db = getFirestore();
                let refDoc;
                if (!id) {
                   // console.log("No se está aplicando ningún filtro de categoría.");
                    refDoc = collection(db, 'Productos');
                } else {
                    if (id === 'Todos') {
                      //  console.log("Filtrando por todas las categorías.");
                        refDoc = collection(db, 'Productos');
                    } else {
                        //console.log(`Filtrando por la categoría: ${id}`);
                        refDoc = query(collection(db, 'Productos'), where('Categoria', '==', id));
                    }
                }
                const snapshot = await getDocs(refDoc);
                const productList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                //console.log(`Número de productos encontrados: ${productList.length}`);
                setProducts(productList);
            } catch (error) {
                alert(`No se pudo conectar con el servidor: ${error}`);
            }
        };

        fetchProducts();
    }, [id]);

    return { productos };
}