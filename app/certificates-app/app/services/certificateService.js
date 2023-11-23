import axios from "../utils/axios";

const certificateService = {
  listCertificates: async (profile, userId) => {
    const url =
      profile === "admin"
        ? `/certificate/list`
        : profile === "operator"
        ? `/certificate/list?profile=client`
        : `/certificate/findByUser/${userId}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar as solicitações:", error);
      throw error;
    }
  },

  updateCertificateStatus: async (certificateId, newStatus) => {
    try {
      const response = await axios.patch(
        `/certificate/${certificateId}/status`,
        {
          status: newStatus,
        }
      );
      return response;
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      throw error;
    }
  },

  deleteCertificate: async (certificateId) => {
    try {
      const response = await axios.delete(`/certificate/${certificateId}`);
      return response;
    } catch (error) {
      console.error("Erro ao excluir a solicitação:", error);
      throw error;
    }
  },

  createCertificate: async (certificateData, userId) => {
    const formData = new FormData();
    for (const [key, value] of Object.entries(certificateData)) {
      formData.append(key, value);
    }
    formData.append("userId", userId);

    try {
      const response = await axios.post("/certificate/generate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      throw error;
    }
  },
};

export default certificateService;
