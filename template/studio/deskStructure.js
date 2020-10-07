import S from '@sanity/desk-tool/structure-builder'
import { MdPerson } from "react-icons/md";
import { MdEvent as MdEventNote } from "react-icons/md";
import { MdGavel } from "react-icons/md";
import { MdInfoOutline as MdInfo } from "react-icons/md";

const hiddenDocTypes = listItem =>
  !['program', 'session', 'person', 'eventInformation', 'codeOfConduct'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Event information')
        .icon(MdInfo)
        .child(
          S.editor()
            .id('eventInformation')
            .schemaType('eventInformation')
            .documentId('eventInformation')
        ),
      S.listItem()
        .title('Sessions')
        .schemaType('session')
        .child(S.documentTypeList('session').title('Sessions')),
      S.listItem()
        .title('Program')
        .icon(MdEventNote)
        .child(
          S.editor()
            .id('program')
            .schemaType('program')
            .documentId('program')
        ),
      S.listItem()
        .title('Persons')
        .icon(MdPerson)
        .schemaType('person')
        .child(S.documentTypeList('person').title('Persons')),
      S.listItem()
        .title('Code of Conduct')
        .icon(MdGavel)
        .child(
          S.editor()
            .id('codeOfConduct')
            .schemaType('codeOfConduct')
            .documentId('codeOfConduct')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
