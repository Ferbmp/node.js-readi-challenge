import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useAuth } from "@/app/context/AuthContext";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import certificateService from "@/app/services/certificateService";

const schema = yup.object({
  fullName: yup.string().required("O nome completo é obrigatório"),
  cpf: yup.string().required("O CPF é obrigatório"),
  phoneNumber: yup.string().required("O telefone é obrigatório"),
  birthDate: yup
    .date("Valor para data invalido")
    .required("A data de nascimento é obrigatória"),
  city: yup.string().required("A cidade é obrigatória"),
  state: yup.string().required("O estado é obrigatório"),
  street: yup.string().required("O logradouro é obrigatório"),
  number: yup.string().required("O número é obrigatório"),
  zipCode: yup.string().required("O CEP é obrigatório"),
  certificateType: yup.string().required("O tipo de certidão é obrigatório"),
  attachedDocument: yup
    .mixed()
    .test("fileSize", "O arquivo é muito grande (máximo de 2MB)", (value) => {
      if (!value) return true;

      return value.size <= 2097152;
    }),
});

export default function RequestForm() {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onFileChange = (event) => {
    if (event.target.files.length > 0) {
      setValue("attachedDocument", event.target.files[0], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await certificateService.createCertificate(data, user.id);
      toast.success("Solicitação enviada com sucesso!");
      reset();
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      toast.error("Falha ao enviar solicitação.");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <Typography variant="h6">Solicitar Emissão de Certidão</Typography>
      <Controller
        name="fullName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Nome Completo"
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />
        )}
      />

      <Controller
        name="cpf"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="999.999.999-99"
            value={field.value}
            onChange={field.onChange}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                fullWidth
                label="CPF"
                margin="normal"
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="(99) 99999-9999"
            value={field.value}
            onChange={field.onChange}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="Telefone"
                fullWidth
                margin="normal"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber?.message}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="birthDate"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Data de Nascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            margin="normal"
            error={!!errors.birthDate}
            helperText={errors.birthDate?.message}
          />
        )}
      />
      <Controller
        name="city"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Cidade"
            fullWidth
            margin="normal"
            error={!!errors.city}
            helperText={errors.city?.message}
          />
        )}
      />
      <Controller
        name="state"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Estado"
            fullWidth
            margin="normal"
            error={!!errors.state}
            helperText={errors.state?.message}
          />
        )}
      />
      <Controller
        name="street"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Logradouro"
            fullWidth
            margin="normal"
            error={!!errors.street}
            helperText={errors.street?.message}
          />
        )}
      />
      <Controller
        name="number"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Número"
            fullWidth
            margin="normal"
            error={!!errors.number}
            helperText={errors.number?.message}
          />
        )}
      />
      <Controller
        name="zipCode"
        control={control}
        render={({ field }) => (
          <InputMask
            mask="99999-999"
            value={field.value}
            onChange={field.onChange}
          >
            {(inputProps) => (
              <TextField
                {...inputProps}
                label="CEP"
                margin="normal"
                fullWidth
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
              />
            )}
          </InputMask>
        )}
      />
      <Controller
        name="certificateType"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl
            fullWidth
            margin="normal"
            error={!!errors.certificateType}
          >
            <InputLabel>Tipo de Certidão</InputLabel>
            <Select {...field} label="Tipo de Certidão">
              <MenuItem value="casamento">Casamento</MenuItem>
              <MenuItem value="nascimento">Nascimento</MenuItem>
              <MenuItem value="imóvel">Imóvel</MenuItem>
            </Select>
            <Typography variant="caption" color="error">
              {errors.certificateType?.message}
            </Typography>
          </FormControl>
        )}
      />

      <Controller
        name="attachedDocument"
        control={control}
        defaultValue=""
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <input
            name={name}
            ref={ref}
            type="file"
            accept=".pdf,.png"
            onChange={(e) => {
              onChange(e.target.files[0]);
              onFileChange(e);
            }}
            onBlur={onBlur}
            style={{ margin: "20px 0" }}
          />
        )}
      />
      {errors.attachedDocument && (
        <Typography color="error" variant="body2">
          {errors.attachedDocument.message}
        </Typography>
      )}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3, mb: 2 }}
      >
        Enviar Solicitação
      </Button>
    </Box>
  );
}
