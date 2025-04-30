import { Button, Input, Select } from '@mantine/core'
import "./ProductForm.css"
import '@mantine/tiptap/styles.css';
import '@mantine/dropzone/styles.css';

import { RichTextEditor } from '@mantine/tiptap';
import { Group, Text } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useEffect } from 'react';
import useProductForm from './utils/useProductForm';
import { FaTrash } from "react-icons/fa";
import { useAppContext } from '../../../../../Context/AppContext';
function ProductForm() {
    const {
        handleUploadImages,
        productForm,
        handleChangeValues,
        removeImage,
        onFinish,
        savingProduct,
        editor
    } = useProductForm()

    const {
        categoriesHook:{
            categories
        }
    } = useAppContext()

    useEffect(() => {
        if (!editor) return;

        const updateDescription = () => {
            const html = editor.getHTML();
            handleChangeValues({
                target: {
                    name: "product_description",
                    value: html,
                },
            } as React.ChangeEvent<HTMLInputElement>);
        };

        editor.on("update", updateDescription);

        return () => {
            editor.off("update", updateDescription);
        };
    }, [editor]);

    function DropzoneInput(props: Partial<DropzoneProps>) {
        return (
            <Dropzone
                onDrop={(files) => handleUploadImages(files)}
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
                            Arrastrá acá tus imagenes o hacé click para subirlas
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Puedes subir hasta 6 imagenes
                        </Text>
                    </div>
                </Group>
            </Dropzone>
        );
    }
    return (
        <form className="product-form" onSubmit={onFinish}>
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
                        onChange={handleChangeValues}
                        value={productForm.product_name}

                    />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Categoría del producto"
                    description="Seleccioná de tu lista de categorías"
                    className='product-wrapper-input'
                >
                    <Select
                        name="product_category"
                        onChange={(val) =>
                            handleChangeValues({ target: { name: "product_category", value: val } } as React.ChangeEvent<HTMLInputElement>)
                        }
                        value={productForm.product_category}
                        data={categories.map((category) => ({
                            value: category.category_id,
                            label: category.category_name
                        }))}
                        searchable
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
                        onChange={handleChangeValues}
                        value={productForm.product_price}
                    />
                </Input.Wrapper>

                <Input.Wrapper
                    label="Stock disponible"
                    description="¿Cuantos productos hay en stock?"
                    required
                    className='product-wrapper-input'
                >
                    <Input name="product_stock"
                        type='number'
                        onChange={handleChangeValues}
                        value={productForm.product_stock}
                    />
                </Input.Wrapper>

                <Input.Wrapper
                    className='product-wrapper-input'
                    label="Descripción del producto"
                    description="Ingresá una breve descripción de tu producto"
                >
                    <RichTextEditor editor={editor} className='product-editor'>
                        <RichTextEditor.Toolbar >
                            <RichTextEditor.ControlsGroup>
                                <RichTextEditor.Bold />
                                <RichTextEditor.Italic />
                                <RichTextEditor.Underline />
                                <RichTextEditor.Strikethrough />
                                <RichTextEditor.ClearFormatting />
                                <RichTextEditor.Highlight />
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
                    description="Ingresá las imagenes de tu producto (la primera será la portada)"
                >
                    <DropzoneInput />
                    <div className="image-preview-wrapper">
                        {productForm.product_images.map((img) => (
                            <div key={img.image_id} className="image-preview-item">
                                <img
                                    src={URL.createObjectURL(img.originFileObj)}
                                    alt={img.image_name}
                                    width={100}
                                    className="preview-thumbnail"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(img.image_id)}
                                    className="remove-image-button"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>

                </Input.Wrapper>
            <Button className='product-form-button' type='submit' color='dark' c={"white"} disabled={savingProduct} loading={savingProduct}>Guardar Producto</Button>
            </div>

        </form>

    )
}

export default ProductForm
