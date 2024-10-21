import { BrowserRouter, Route, Routes, Outlet, RouterProvider } from "react-router-dom";

import { RefineThemes ,useNotificationProvider } from '@refinedev/antd';
import { Refine, ErrorComponent ,Authenticated, } from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import routerProvider, { 
       CatchAllNavigate,
       DocumentTitleHandler,
       NavigateToResource, 
       UnsavedChangesNotifier, 
} from '@refinedev/react-router-v6';

import { App as AntdApp, ConfigProvider } from "antd"

import { Layout } from "./components";
import { resources } from './config/resources';
import { authProvider, dataProvider, liveProvider } from './providers';
import {
    CompanyCreatePage,
    CompanyEditPage,
    CompanyListPage,
    DashboardPage,
    ForgotPassword,
    Login,
    Register,
    TasksCreatePage,
    TasksEditPage,
    TasksListPage,
} from "@/routes";

import "@refinedev/antd/dist/reset.css";

function App() {
    return (
        <BrowserRouter>
            <ConfigProvider theme={RefineThemes.Blue} >
              <AntdApp>
                <DevtoolsProvider>
                    <Refine 
                        routerProvider={routerProvider}
                        dataProvider={dataProvider}
                        liveProvider={liveProvider}
                        notificationProvider={useNotificationProvider}
                        authProvider={authProvider} 
                        resources={resources}
                        options={{
                            syncWithLocation: true,
                            warnWhenUnsavedChanges: true,
                            useNewQueryKeys: true,
                            liveMode: "auto",
                    }}
                >
                    <Routes>
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/forgot-password" element={<ForgotPassword/>} />
                        <Route
                            element = {
                            <Authenticated 
                                key="authenticated-layout"
                                fallback={<CatchAllNavigate to="/login" />}
                            >
                                <Layout>
                                 <Outlet />
                                </Layout>   
                            </Authenticated>
                            }
                            >
                            <Route index element={<DashboardPage />} />

                            <Route 
                                path="/tasks" 
                                element={
                                <TasksListPage>
                                    <Outlet />
                                </TasksListPage>
                            }
                            >
                                <Route path="new" element={<TasksCreatePage />} />
                                <Route path="edit/:id" element={<TasksEditPage />} />
                        </Route> 

                        <Route path="/companies">
                    <Route index element={<CompanyListPage />} />
                    <Route path="new" element={<CompanyCreatePage />} />
                    <Route path="edit/:id" element={<CompanyEditPage />} />
                  </Route>

                        <Route path="*" element={<ErrorComponent />} />
                    </Route> 

                    <Route
                        element={
                            <Authenticated
                            key="authenticated-auth"
                            fallback={<Outlet />}
                            >
                            <NavigateToResource resource="dashboard" />
                            </Authenticated>
                         }
                        >
                  <Route path="/login" element={<Login />} />
                </Route>  
                    </Routes>
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            <DevtoolsPanel />
            </DevtoolsProvider>
            </AntdApp>
          </ConfigProvider>
        </BrowserRouter>
      );
};

export default App;
