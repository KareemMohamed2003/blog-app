import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import { media } from 'sanity-plugin-media'
export default defineConfig({
  name: 'default',
  title: 'blog-app-backend',

  projectId: 'xplrd9jy',
  dataset: 'production',

  plugins: [deskTool(),media()],

  schema: {
    types: schemaTypes,
  },

})
