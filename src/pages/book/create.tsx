import type { GetServerSideProps } from "next";
import type { SubmitHandler } from "react-hook-form";
import type { TypeOf } from "zod";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "../../components/Layout";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ACCEPTED_IMAGE_TYPES,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
  MAX_FILE_SIZE,
} from "../../utils/constant";
import { useState } from "react";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import FormInput from "../../components/Forms/FormInput";
import FormTextarea from "../../components/Forms/FormTextarea";
import FormFileUploader from "../../components/Forms/FormFileUploader";
import { FormButton } from "../../components/Forms/FormButton";

const createBookFormInputs = z.object({
  name: z.string().min(1, "Book name is required").max(100),
  author: z.string().min(1, "Author name is required").max(100),
  publisher: z.string().optional(),
  description: z.string().optional(),
  image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is more than 1MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
});

type CreateBookFormInputs = TypeOf<typeof createBookFormInputs>;

export default function AddBookPage() {
  const router = useRouter();

  const [isImageLoading, setIsImageLoading] = useState(false);

  const { mutate: createBook, isLoading } = trpc.book.createBook.useMutation({
    onSuccess(data) {
      router.push(`/book/${data.data.book.id}`);
    },
  });

  const methods = useForm<CreateBookFormInputs>({
    resolver: zodResolver(createBookFormInputs),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<CreateBookFormInputs> = async (
    values
  ) => {
    const files = values.image as FileList;
    const newFile = Object.values(files).map((file: File) => file);
    const formData = new FormData();

    formData.append("file", newFile[0]!);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    setIsImageLoading(true);

    const cloudinaryImage = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        setIsImageLoading(false);
        return res.json();
      })
      .catch((err: any) => {
        console.log(err);
        setIsImageLoading(false);
      });

    await createBook({ ...values, image: cloudinaryImage.secure_url });
  };

  return (
    <Layout title="Add Book - Fake Bookshelf">
      <div className="mb-16 pt-16 text-white xl:flex xl:w-full xl:justify-center">
        <div className="relative mx-auto w-full max-w-[600px]">
          <div className="relative mx-auto w-full max-w-[600px]">
            <h1 className="font-primary text-[35px] font-bold">
              Add a new book to bookshelf
            </h1>
            <p className="mt-8 text-lg leading-[32px]">
              You can create a new book by simply entering the title, author,
              and any other relevant information. You can then add the book to
              your library and mark it as read, liked, or score it based on your
              personal rating system.
            </p>
          </div>
        </div>
        <div className="lg: relaitve mx-auto mt-12 mb-16 block w-full max-w-[580px] overflow-hidden rounded-[20px] xl:mx-8 xl:mt-0 xl:mb-0">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <fieldset disabled={isLoading || isImageLoading}>
                <div className="mb-4 text-white">
                  <div className="mx-auto -mt-4 w-full xl:max-w-[450px]">
                    <FormInput name="name" label="Book Name" />
                    <FormInput name="author" label="Author Name" />
                    <FormInput name="publisher" label="Book Publisher" />
                    <FormTextarea name="description" label="Book Synopis" />
                    <FormFileUploader
                      name="image"
                      label="Choose a book cover"
                    />
                    <div className="mt-7">
                      <FormButton loading={isLoading || isImageLoading}>
                        Add Book
                      </FormButton>
                    </div>
                  </div>
                </div>
              </fieldset>
            </form>
          </FormProvider>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
