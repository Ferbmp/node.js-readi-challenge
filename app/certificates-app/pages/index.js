import { useState, useEffect } from "react";

import SideMenu from "@/app/components/SideMenu";

import RequestForm from "@/app/components/RequestForm";
import RequestsList from "@/app/components/RequestsList";
import { useAuth } from "@/app/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  const [activeMenu, setActiveMenu] = useState("request");
  useEffect(() => {
    if (user && user.profile === "operator") {
      setActiveMenu("search");
    } else {
      return;
    }
  }, [user]);

  const renderActiveComponent = () => {
    switch (activeMenu) {
      case "request":
        return <RequestForm />;
      case "search":
        return <RequestsList />;
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideMenu activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
        <div style={{ flex: 1, padding: "20px" }}>
          {renderActiveComponent()}
        </div>
      </div>
    </>
  );
}
