// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,
    Button,
    Col,
    Input
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
import ModalInputItem from "components/Modal/InputItem";
import { useState } from "react";
  
  const ItemEvidance = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [created, setCreated] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
      <>
      <ModalInputItem toggle={toggle} isOpen={isOpen} created={created}  />
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col-12">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <Col>
                      <h3 className="mb-0">List Barang Bukti</h3>
                    </Col>
                    <Col className="text-right d-flex align-items-center">
                      <Input placeholder="Search" />
                      <Button color="primary" className="ml-2">
                        <i className="fa fa-search" />
                      </Button>
                    </Col>
                  </Row>
                  <Button size="sm" color="primary" onClick={toggle}>Input Barang Bukti</Button>
                </CardHeader>
                <div className="table-wrap">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nomor Register Bukti (BA-5)</th>
                        <th scope="col">Nama Tersangka</th>
                        <th scope="col">Perkara</th>
                        <th scope="col">Barang Bukti</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          1
                        </th>
                        <td>06/BB/03/2022</td>
                        <td>PERDAMENTA GINTING dan BOY GINTING</td>
                        <td>
                          Pencurian
                        </td>
                        <td>
                          6 (enam) batang pipa GIP besi ukuran 6 inchi dengan panjang masing-masing 3.5 meter.
                        </td>
                        <td>
                          <Badge color="warning">
                            Sudah Isi Form
                          </Badge>
                        </td>
                        <td className="text-right">
                          <div className="d-flex align-items-center">
                            <Button type="button" size="sm">
                              <i className="fa fa-eye" />
                            </Button>
                            <Button type="button" size="sm">
                              <i className="fa fa-edit" />
                            </Button>
                            <Button type="button" size="sm">
                              <i className="fa fa-trash text-danger" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  };
  
  export default ItemEvidance;
  