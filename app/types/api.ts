/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/agent/tasks': {
    /** List all tasks that have been created for the agent. */
    get: operations['listAgentTasksIDs']
    /** Creates a task for the agent. */
    post: operations['createAgentTask']
  }
  '/agent/tasks/{task_id}': {
    /** Get details about a specified agent task. */
    get: operations['getAgentTask']
  }
  '/agent/tasks/{task_id}/steps': {
    /** List all steps for the specified task. */
    get: operations['listAgentTaskSteps']
    /** Execute a step in the specified agent task. */
    post: operations['executeAgentTaskStep']
  }
  '/agent/tasks/{task_id}/steps/{step_id}': {
    /** Get details about a specified task step. */
    get: operations['getAgentTaskStep']
  }
  '/agent/tasks/{task_id}/artifacts': {
    /** List all artifacts that have been created for the given task. */
    get: operations['listAgentTaskArtifacts']
    /** Upload an artifact for the specified task. */
    post: operations['uploadAgentTaskArtifacts']
  }
  '/agent/tasks/{task_id}/artifacts/{artifact_id}': {
    /** Download a specified artifact. */
    get: operations['downloadAgentTaskArtifact']
  }
}

export type webhooks = Record<string, never>

export interface components {
  schemas: {
    /**
     * @description Input parameters for the task. Any value is allowed.
     * @example {
     * "debug": false,
     * "mode": "benchmarks"
     * }
     */
    TaskInput: unknown
    /** @description Artifact that the task has produced. */
    Artifact: {
      /**
       * @description ID of the artifact.
       * @example b225e278-8b4c-4f99-a696-8facf19f0e56
       */
      artifact_id: string
      /**
       * @description Filename of the artifact.
       * @example main.py
       */
      file_name: string
      /**
       * @description Relative path of the artifact in the agent's workspace.
       * @example python/code/
       */
      relative_path?: string
    }
    /** @description Artifact to upload to the agent. */
    ArtifactUpload: {
      /**
       * Format: binary
       * @description File to upload.
       */
      file: string
      /**
       * @description Relative path of the artifact in the agent's workspace.
       * @example python/code
       */
      relative_path?: string
    }
    /**
     * @description Input parameters for the task step. Any value is allowed.
     * @example {
     * "file_to_refactor": "models.py"
     * }
     */
    StepInput: unknown
    /**
     * @description Output that the task step has produced. Any value is allowed.
     * @example {
     * "tokens": 7894,
     * "estimated_cost": "0,24$"
     * }
     */
    StepOutput: unknown
    /** @description Body of the task request. */
    TaskRequestBody: {
      /**
       * @description Input prompt for the task.
       * @example Write the words you receive to the file 'output.txt'.
       */
      input?: string
      additional_input?: components['schemas']['TaskInput']
    }
    Task: components['schemas']['TaskRequestBody'] & {
      /**
       * @description The ID of the task.
       * @example 50da533e-3904-4401-8a07-c49adf88b5eb
       */
      task_id: string
      /**
       * @description A list of artifacts that the task has produced.
       * @default []
       * @example [
       *   "7a49f31c-f9c6-4346-a22c-e32bc5af4d8e",
       *   "ab7b4091-2560-4692-a4fe-d831ea3ca7d6"
       * ]
       */
      artifacts: components['schemas']['Artifact'][]
    }
    /** @description Body of the task request. */
    StepRequestBody: {
      /**
       * @description Input prompt for the step.
       * @example Washington
       */
      input?: string
      additional_input?: components['schemas']['StepInput']
    }
    Step: components['schemas']['StepRequestBody'] & {
      /**
       * @description The ID of the task this step belongs to.
       * @example 50da533e-3904-4401-8a07-c49adf88b5eb
       */
      task_id: string
      /**
       * @description The ID of the task step.
       * @example 6bb1801a-fd80-45e8-899a-4dd723cc602e
       */
      step_id: string
      /**
       * @description The name of the task step.
       * @example Write to file
       */
      name?: string
      /**
       * @description The status of the task step.
       * @enum {string}
       */
      status: 'created' | 'running' | 'completed'
      /**
       * @description Output of the task step.
       * @example I am going to use the write_to_file command and write Washington to a file called output.txt <write_to_file('output.txt', 'Washington')
       */
      output?: string
      additional_output?: components['schemas']['StepOutput']
      /**
       * @description A list of artifacts that the step has produced.
       * @default []
       */
      artifacts: components['schemas']['Artifact'][]
      /**
       * @description Whether this is the last step in the task.
       * @default false
       */
      is_last?: boolean
    }
  }
  responses: never
  parameters: never
  requestBodies: never
  headers: never
  pathItems: never
}

export type external = Record<string, never>

export interface operations {
  /** List all tasks that have been created for the agent. */
  listAgentTasksIDs: {
    responses: {
      /** @description Returned list of agent's task IDs. */
      200: {
        content: {
          'application/json': components['schemas']['Task'][]
        }
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Creates a task for the agent. */
  createAgentTask: {
    requestBody?: {
      content: {
        'application/json': components['schemas']['TaskRequestBody']
      }
    }
    responses: {
      /** @description A new agent task was successfully created. */
      200: {
        content: {
          'application/json': components['schemas']['Task']
        }
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Get details about a specified agent task. */
  getAgentTask: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
      }
    }
    responses: {
      /** @description Returned details about an agent task. */
      200: {
        content: {
          'application/json': components['schemas']['Task']
        }
      }
      /** @description Task not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** List all steps for the specified task. */
  listAgentTaskSteps: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
      }
    }
    responses: {
      /** @description Returned list of agent's step IDs for the specified task. */
      200: {
        content: {
          'application/json': string[]
        }
      }
      /** @description Task not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Execute a step in the specified agent task. */
  executeAgentTaskStep: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
      }
    }
    requestBody?: {
      content: {
        'application/json': components['schemas']['StepRequestBody']
      }
    }
    responses: {
      /** @description Executed step for the agent task. */
      200: {
        content: {
          'application/json': components['schemas']['Step']
        }
      }
      /** @description Task not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Get details about a specified task step. */
  getAgentTaskStep: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
        /** @description ID of the step */
        step_id: string
      }
    }
    responses: {
      /** @description Returned details about an agent task step. */
      200: {
        content: {
          'application/json': components['schemas']['Step']
        }
      }
      /** @description Task or step not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** List all artifacts that have been created for the given task. */
  listAgentTaskArtifacts: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
      }
    }
    responses: {
      /** @description Returned the content of the artifact. */
      200: {
        content: {
          'application/json': components['schemas']['Artifact'][]
        }
      }
      /** @description Task not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Upload an artifact for the specified task. */
  uploadAgentTaskArtifacts: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
      }
    }
    requestBody?: {
      content: {
        'multipart/form-data': components['schemas']['ArtifactUpload']
      }
    }
    responses: {
      /** @description Returned the content of the artifact. */
      200: {
        content: {
          'application/json': components['schemas']['Artifact']
        }
      }
      /** @description Task not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
  /** Download a specified artifact. */
  downloadAgentTaskArtifact: {
    parameters: {
      path: {
        /** @description ID of the task */
        task_id: string
        /** @description ID of the artifact */
        artifact_id: string
      }
    }
    responses: {
      /** @description Returned the content of the artifact. */
      200: {
        content: {
          'application/octet-stream': string
        }
      }
      /** @description Task or artifact not found. */
      404: {
        content: never
      }
      /** @description Internal Server Error */
      default: {
        content: never
      }
    }
  }
}
