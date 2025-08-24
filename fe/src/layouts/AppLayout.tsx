import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const AppLayout = () => {
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <Content style={{ padding: "24px", minHeight: "280px" }}>
          <Outlet />
        </Content>
      </QueryClientProvider>
    </Layout>
  );
};

export default AppLayout;