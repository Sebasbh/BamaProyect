import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Alert, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';

const api = axios.create({
  baseURL: 'http://localhost:8000'
});

const fetchClientesPedidosAlbaranNumber = async () => {
  try {
    const response = await Promise.all([
      api.get('/clientes'),
      api.get('/pedidos'),
      api.get('/albaranes/next/number')
    ]);

    const clientes = response[0].data;
    const pedidos = response[1].data;
    const nextAlbaranNumber = response[2].data.nextAlbaranNumber;

    return { clientes, pedidos, nextAlbaranNumber };
  } catch (error) {
    throw new Error('Error al cargar los datos.');
  }
};

function FormularioAlbaranes() {
  const [clientes, setClientes] = useState([]);
  const [pedidos, setPedidos] = useState(null);
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [importe, setImporte] = useState('');
  const [numeroAlbaran, setNumeroAlbaran] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { clientes, pedidos, nextAlbaranNumber } = await fetchClientesPedidosAlbaranNumber();
        setClientes(clientes);
        setPedidos(pedidos);
        setNumeroAlbaran(nextAlbaranNumber);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!clienteSeleccionado || !importe || !pedidoSeleccionado || !estado || !fecha) {
      setError('Por favor, rellena todos los campos.');
      return;
    }

    // Determine the value of isApproved based on some condition in your application
    const isApproved = true; // or false, depending on whether the Albaran is Firmado or No firmado

    const newAlbaran = {
      numero_de_albaran: numeroAlbaran,
      empresa: clienteSeleccionado,
      importe: parseFloat(importe),
      numero_de_pedido: parseInt(pedidoSeleccionado),
      archivo_de_entrega: '', // Add the value for the archivo_de_entrega field
      estado: estado,
      fecha_albaran: new Date(fecha), // Convert the fecha to a Date object
      isApproved: isApproved, // Set the isApproved field to false by default
    };

    setLoading(true);
    try {
      const { data: { albaran } } = await api.post('/albaranes', newAlbaran);
      setMessage('¡Albaran creado correctamente!');
      setClienteSeleccionado('');
      setImporte('');
      setEstado('');
      setFecha('');
      setError(null);
    } catch (error) {
      setError('Error al crear el albaran. Por favor, inténtelo nuevamente.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Header />

      <Breadcrumb style={{ marginLeft: '100px', marginTop: '20px' }}>
        <Breadcrumb.Item href="/Home">Inicio</Breadcrumb.Item>
        <Breadcrumb.Item href="http://localhost:3000/GestionAlbaranes">Albaranes</Breadcrumb.Item>
        <Breadcrumb.Item active>FormularioAlbaranes</Breadcrumb.Item>
      </Breadcrumb> <br />

      <Container className="d-flex align-items-center justify-content-center">
        <div>
          <h3>Crear Nuevo Albaran</h3> <br />
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="numeroAlbaran">
                  <Form.Label>Número de Albaran</Form.Label>
                  <Form.Control type="text" value={numeroAlbaran} readOnly 
                  style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="clientes">
                  <Form.Label>Empresa</Form.Label>
                  <Form.Control
                    as="select"
                    value={clienteSeleccionado}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Selecciona una empresa</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.CIF} value={cliente.empresa}>
                        {cliente.empresa}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="importe">
                  <Form.Label>Importe</Form.Label>
                  <Form.Control
                    type="text"
                    value={importe}
                    onChange={(e) => setImporte(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control
                    as="select"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Seleccione una opción</option>
                    <option value="Firmado">Firmado</option>
                    <option value="No firmado">No firmado</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    required
                    style={{ width: '500px', height: '40px' }}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pedidos">
                  <Form.Label>Pedidos</Form.Label>
                  <Form.Control
                    as="select"
                    value={pedidoSeleccionado}
                    onChange={(e) => setPedidoSeleccionado(e.target.value)}
                    style={{ width: '500px', height: '40px' }}
                  >
                    <option value="">Selecciona un pedido</option>
                    {/* Check if pedidos is not null before mapping through it */}
                    {pedidos !== null &&
                      pedidos.map((pedido) => (
                        <option key={pedido.numero_de_pedido} value={pedido.numero_de_pedido}>
                          {pedido.numero_de_pedido}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
                {/* ... (rest of the code) */}
                <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
                  {loading ? 'Creando Albaran...' : 'Crear Albaran'}
                </Button>
                {/* Fix: Add the 'to' prop for the Link component */}
                <Link to="/GestionAlbaranes" className="btn btn-secondary mt-3 ms-3">
                  Cancelar
                </Link>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}

export default FormularioAlbaranes;