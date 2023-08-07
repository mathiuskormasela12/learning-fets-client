export const openapi = {
  openapi: '3.0.0',
  info: {
    title: 'Contact Management',
    version: '1.0'
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [],
  paths: {
    '/api/contact/{contactId}': {
      get: {
        description: 'Get Contact By Id',
        tags: [
          'Contact'
        ],
        summary: 'Get Contact',
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'integer',
                      format: 'int32'
                    },
                    data: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'string'
                        },
                        contact_name: {
                          type: 'string'
                        },
                        email: {
                          type: 'string'
                        },
                        phone_number: {
                          type: 'string'
                        },
                        created_at: {
                          type: 'string'
                        },
                        updated_at: {
                          type: 'string'
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        parameters: [
          {
            name: 'contactId',
            in: 'path',
            schema: {
              type: 'string'
            }
          }
        ]
      },
      put: {
        tags: [
          'Contact'
        ],
        description: 'Update Contact',
        summary: 'Update Contact',
        parameters: [
          {
            name: 'contactId',
            in: 'path',
            type: 'string',
            description: 'Contact Id'
          }
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'integer',
                      format: 'int32',
                      default: 201
                    },
                    message: {
                      type: 'string',
                      default: 'Update Success'
                    }
                  }
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  contact_name: {
                    type: 'string',
                    default: 'Jhon Doe'
                  },
                  email: {
                    type: 'string',
                    default: 'email'
                  },
                  phone_number: {
                    type: 'string',
                    default: 892028292
                  }
                }
              }
            }
          }
        }
      },
      delete: {
        tags: [
          'Contact'
        ],
        summary: 'Delete Contact',
        description: 'Delete Contact',
        parameters: [
          {
            name: 'contactId',
            type: 'string',
            in: 'path',
            description: 'Contact Id'
          }
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'string',
                      default: 200
                    },
                    message: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/contact': {
      post: {
        tags: [
          'Contact'
        ],
        description: 'Add Contact',
        summary: 'Add Contact',
        responses: {
          201: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'integer',
                      format: 'int32',
                      default: 201
                    },
                    message: {
                      type: 'string',
                      default: 'Register Success'
                    }
                  }
                }
              }
            }
          }
        },
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  contact_name: {
                    type: 'string',
                    default: 'Jhon Doe'
                  },
                  email: {
                    type: 'string',
                    default: 'email'
                  },
                  phone_number: {
                    type: 'string',
                    default: 892028292
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/contacts': {
      get: {
        summary: 'Get Contacts',
        description: 'Get All Contacts',
        tags: [
          'Contact'
        ],
        responses: {
          200: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    statusCode: {
                      type: 'integer',
                      format: 'int32',
                      default: 200
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            default: 'eacabaca-0d5b-41ec-92d2-d698c7f20852'
                          },
                          contact_name: {
                            default: 'Jhon Doe',
                            type: 'string'
                          },
                          email: {
                            type: 'string',
                            default: 'jhon@gmail.com'
                          },
                          phone_number: {
                            type: 'string',
                            default: 82939393
                          },
                          created_at: {
                            type: 'string',
                            default: '2023-08-07T09:56:36.481Z'
                          },
                          updated_at: {
                            type: 'string',
                            default: '2023-08-07T09:56:36.481Z'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  tags: []
} as const
