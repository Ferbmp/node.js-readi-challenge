import { useState, useEffect } from "react";
import RequestCard from "@/app/components/RequestCard";
import { useAuth } from "@/app/context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import certificateService from "@/app/services/certificateService";
import { Typography } from "@mui/material";

export default function RequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const fetchRequests = async () => {
    setLoading(true);

    try {
      const certificates = await certificateService.listCertificates(
        user.profile,
        user.id
      );
      setRequests(certificates);
    } catch (error) {
      console.error("Erro ao buscar as solicitações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDeleteSuccess = (deletedId) => {
    setRequests(requests.filter((request) => request.id !== deletedId));
  };

  const handleEditSuccess = (editedId, newStatus) => {
    setRequests(
      requests.map((request) => {
        if (request.id === editedId) {
          return { ...request, status: newStatus };
        }
        return request;
      })
    );
  };

  const getTitle = () => {
    switch (user?.profile) {
      case "client":
        return "Suas Solicitações";
      case "operator":
        return "Solicitações de Clientes";
      case "admin":
        return "Todas as Solicitações";
      default:
        return "Solicitações";
    }
  };

  return (
    <div style={{ position: "relative", height: "100%" }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ mb: 3, mt: 3 }}
      >
        {getTitle()}
      </Typography>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onEditSuccess={handleEditSuccess}
            onDeleteSuccess={handleDeleteSuccess}
            user={user}
          />
        ))
      )}
    </div>
  );
}
