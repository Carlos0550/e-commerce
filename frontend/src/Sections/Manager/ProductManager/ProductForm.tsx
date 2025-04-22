import { Input, Select } from '@mantine/core'
import "./ProductForm.css"
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';

import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Group, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';



function ProductForm() {
    const content =
        '<h2 style="text-align: center;">Welcome to Mantine rich text editor</h2><p><code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:</p><ul><li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s> </li><li>Headings (h1-h6)</li><li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub> tags)</li><li>Ordered and bullet lists</li><li>Text align&nbsp;</li><li>And all <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">other extensions</a></li></ul>';

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
    });

    function DropzoneInput(props: Partial<DropzoneProps>) {
        return (
            <Dropzone
                onDrop={(files) => console.log('accepted files', files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload size={52} color="var(--mantine-color-blue-6)" stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX size={52} color="var(--mantine-color-red-6)" stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={52} color="var(--mantine-color-dimmed)" stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        );
    }
    return (
        <form className="product-form">
            <div className="form-grid">
                <Input.Wrapper
                    label="Nombre del producto"
                    description="Ingresá un nombre llamativo y corto para tu producto"
                    required
                    className='product-wrapper-input'
                >
                    <Input
                        name="product_name"
                        type='text'

                    />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Categoría del producto"
                    description="Seleccioná de tu lista de categorías"
                    className='product-wrapper-input'
                >
                    <Select
                        name="product_category"
                        data={[
                            { value: 'faciales', label: 'Faciales' },
                            { value: 'corporales', label: 'Corporales' },
                            { value: 'capilares', label: 'Capilares' },
                            { value: 'servicios', label: 'Servicios' },
                            { value: 'otros', label: 'Otros' }
                        ]}
                        searchable
                        nothingFound="No se encontró ninguna categoría"
                        maxDropdownHeight={150}
                    />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Precio del producto"
                    required
                    className='product-wrapper-input'
                >
                    <Input name="product_price"
                        type='number'

                    />
                </Input.Wrapper>

                <Input.Wrapper
                    className='product-wrapper-input'
                    label="Descripción del producto"
                    description="Ingresá una breve descripción de tu producto"
                >
                    <RichTextEditor editor={editor}>
                        <RichTextEditor.Toolbar sticky stickyOffset={60}>
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
                                <RichTextEditor.Code />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.H1 />
                                <RichTextEditor.H2 />
                                <RichTextEditor.H3 />
                                <RichTextEditor.H4 />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Blockquote />
                                <RichTextEditor.Hr />
                                <RichTextEditor.BulletList />
                                <RichTextEditor.OrderedList />
                                <RichTextEditor.Subscript />
                                <RichTextEditor.Superscript />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Link />
                                <RichTextEditor.Unlink />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.AlignLeft />
                                <RichTextEditor.AlignCenter />
                                <RichTextEditor.AlignJustify />
                                <RichTextEditor.AlignRight />
                            </RichTextEditor.ControlsGroup>

                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Undo />
                                <RichTextEditor.Redo />
                            </RichTextEditor.ControlsGroup>
                        </RichTextEditor.Toolbar>

                        <RichTextEditor.Content />
                    </RichTextEditor>
                </Input.Wrapper>

                <Input.Wrapper
                    className='product-wrapper-input'
                    label="Imagen/es del producto"
                    description="Ingresá las imagenes de tu producto"
                >
                    <DropzoneInput/>
                </Input.Wrapper>
            </div>
        </form>

    )
}

export default ProductForm
