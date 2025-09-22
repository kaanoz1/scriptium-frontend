import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";

const BreadCrumbs = () => {
  const bookBaseUrl = `/books`;
  return (
    <Breadcrumbs size="lg">
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href={bookBaseUrl}>Books</BreadcrumbItem>
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
