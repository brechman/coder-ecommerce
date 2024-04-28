import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

export const useCategoriaList = () => {
    const [categorias, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const db = getFirestore();
                const querySnapshot = await getDocs(collection(db, 'Productos'));
                const categorySet = new Set(); 

                querySnapshot.forEach(doc => {
                    const category = doc.data().Categoria;
                    categorySet.add(category);
                });

                const categoryArray = Array.from(categorySet); 


                console.log(`Se encontraron ${categoryArray.length} categorías:`);
                console.log(categoryArray); 
                setCategories(categoryArray);

       
            } catch (error) {
                console.error('Error obteniendo categorías:', error);
            }
        };

        fetchCategories();
    }, []);

    return { categorias };
};