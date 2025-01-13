import Content from "../../components/Content/Content";
import Input from "../../components/Input/Input";
const Salida = () => {
  return (
    <>
      <Content>
        <div className="lg:col-span-2 w-full">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
              <Input
                label="Persona que recibe"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>

            <div className="md:col-span-5">
              <Input
                label="Persona que entrega"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>

            <div className="md:col-span-3">
              <Input
                label="Cdogio de Producto"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Cantidad"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
                type="number"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Motivo de Salida"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>

            <div className="md:col-span-2">
              <Input
                label="Full Name"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>

            <div className="md:col-span-1">
              <Input
                label="Full Name"
                name="full_name"
                id="full_name"
                value=""
                placeholder="John Doe"
              />
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default Salida;
