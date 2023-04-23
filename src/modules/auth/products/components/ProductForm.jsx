import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Col, Row, Form, Modal, FormControl, Image } from "react-bootstrap";
import * as yup from "yup";
import AxiosClient from "../../../../shared/plugins/axios";
import FeatherIcon from "feather-icons-react";
import Alert, {
  confirmMsj,
  confirmTitle,
  successMsj,
  successTitle,
  errorMsj,
  errorTitle,
} from "../../../../shared/plugins/alerts";

export const ProductForm = ({ isOpen, setCategories, onClose }) => {

  const [subcategories, setSubcategories] = useState([])

  const form = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: yup.object().shape({
      name: yup
        .string()
        .required("Campo obligatorio")
        .min(4, "Mínimo 4 caracteres"),
    }),
    onSubmit: async (values) => {
      return Alert.fire({
        title: confirmTitle,
        text: confirmMsj,
        icon: "warning",
        confirmButtonColor: "#009574",
        confirmButtonText: "Aceptar",
        cancelButtonColor: "#DD6B55",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        backdrop: true,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !Alert.isLoading,
        preConfirm: async () => {
          try {
            const response = await AxiosClient({
              method: "POST",
              url: "/category/",
              data: JSON.stringify(values),
            });
            if (!response.error) {
              setCategories((categories) => [response.data, ...categories]);
              Alert.fire({
                title: successTitle,
                text: successMsj,
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar",
              }).then((result) => {
                if (result.isConfirmed) {
                  handleClose();
                }
              });
            }
            return response;
          } catch (error) {
            Alert.fire({
              title: errorTitle,
              text: errorMsj,
              icon: "error",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Aceptar",
            }).then((result) => {
              if (result.isConfirmed) {
                handleClose();
              }
            });
          }
        },
      });
    },
  });

  const getSubcategories = async () => {
    try {
      const data = await AxiosClient({ url: '/subcategory/' })
      if (!data.error) setSubcategories(data.data)
    } catch (error) {
      console.log('fallo')
    } finally {
    }
  }


  useEffect(() => {
    getSubcategories();


  }, [])



  const handleClose = () => {
    form.resetForm();
    onClose();
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isOpen}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={form.handleSubmit}>



          <Form.Group className='mb-3'>
            <Form.Label>Nombre</Form.Label>
            <FormControl
              name='name'
              placeholder='Calzado'
              value={form.values.name}
              onChange={form.handleChange}
            />
            {form.errors.name &&
              (<span className='error-text'>
                {form.errors.name}
              </span>)}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Descripción</Form.Label>
            <FormControl
              name='description'
              placeholder='Calzado'
              value={form.values.description}
              onChange={form.handleChange}
            />
            {form.errors.description &&
              (<span classdescription='error-text'>
                {form.errors.description}
              </span>)}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Precio</Form.Label>
            <FormControl
              name='price'
              placeholder='Calzado'
              value={form.values.price}
              onChange={form.handleChange}
            />
            {form.errors.price &&
              (<span classprice='error-text'>
                {form.errors.price}
              </span>)}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Marca</Form.Label>
            <FormControl
              name='marca'
              placeholder='Calzado'
              value={form.values.marca}
              onChange={form.handleChange}
            />
            {form.errors.marca &&
              (<span classmarca='error-text'>
                {form.errors.marca}
              </span>)}
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Subcategoria</Form.Label>
            <FormControl as='select'
              name='subcategory'
              placeholder='Calzado'
              value={form.values.subcategory}
              onChange={form.handleChange}
            >
             
              {
                subcategories.map((subcategori) => <option key={subcategori.id}>{subcategori.name}</option> )
              }

            </FormControl>
            {form.errors.subcategory &&
              (<span classsubcategory='error-text'>
                {form.errors.subcategory}
              </span>)}
          </Form.Group>


          <Form.Group className='mb-3'>
            <Form.Label>Imagenes</Form.Label>
            <FormControl type='file'/>

            {form.errors.marca &&
              (<span classmarca='error-text'>
                {form.errors.marca}
              </span>)}
          </Form.Group>


          <Form.Group className="mb-3">
            <Row>
              <Col className="text-end">
                <Button
                  className="me-2"
                  variant="outline-danger"
                  onClick={handleClose}
                >
                  <FeatherIcon icon="x" /> &nbsp;Cerrar
                </Button>
                <Button
                  type="submit"
                  variant="outline-success"
                >
                  <FeatherIcon icon="check" /> &nbsp;Guardar
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
