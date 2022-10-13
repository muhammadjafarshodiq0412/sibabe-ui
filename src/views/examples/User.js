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
  
  const User = () => {
    return (
      <>
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
                      <h3 className="mb-0">List Data User</h3>
                    </Col>
                    <Col className="text-right d-flex align-items-center">
                      <Input placeholder="Search" />
                      <Button color="primary" className="ml-2">
                        <i className="fa fa-search" />
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <div className="table-wrap">
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">NIK</th>
                        <th scope="col">Nama Tersangka</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status User</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">
                          1
                        </th>
                        <td>
                          123456789012345
                        </td>
                        <td>
                          Jafar Shodiq
                        </td>
                        <td>
                          Jafar123
                        </td>
                        <td>
                          jafar@gmail.com
                        </td>
                        <td>
                          <Badge color="success">
                            Aktif
                          </Badge>
                        </td>
                        <td>
                          <Button type="button" size="sm" color="danger">
                              Banned
                          </Button>
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
  
  export default User;
  