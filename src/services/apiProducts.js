import supabase from "./supabase";

export async function getProducts() {
  const { data, error } = await supabase
    .from("product")
    .select(`*, brand(id, title)`);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getProductsByFeatures(feature) {
  const { data, error } = await supabase
    .from("product")
    .select(`*, brand(id, title)`)
    .eq(feature, true);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

export async function getBrands() {
  const { data, error } = await supabase.from("brand").select("*");

  if (error) {
    console.error(error);
    throw new Error("Brands could not be loaded");
  }

  return data;
}

export async function getSubCategories() {
  let { data, error } = await supabase.from("subCategory").select("*");

  if (error) {
    console.error(error);
    throw new Error("SubCategories could not be loaded");
  }

  return data;
}

export async function getProductsByFilters(filters) {
  let { selectedBrand, selectedPrice, selectedCategory, selectedSubCategory } =
    filters;

  if (selectedBrand.length === 0)
    selectedBrand = (await getBrands()).map((brand) => brand.id);
  if (selectedSubCategory.length === 0)
    selectedSubCategory = (await getSubCategories()).map((sub) => sub.id);

  const filtersString = `and(brandId.in.(${selectedBrand}),price.lte.${selectedPrice},categoryId.in.(${selectedCategory}),subCategoryId.in.(${selectedSubCategory}))`;

  const { data, error } = await supabase
    .from("product")
    .select(`*, brand(id, title)`)
    .or(filtersString);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}
