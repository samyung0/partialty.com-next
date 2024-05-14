'use client';

import { default as NextImage } from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { CLOUDINARY_MAX_IMG_SIZE } from '~/const/cloudinaryUpload';

import defaultProfilePicsUrl from '~/const/defaultProfilePicsUrl';
import { cn } from '~/lib/utils';

interface Props {
  error: (error: string) => any;
  setCustomAvatar: (isCustom: boolean, imageString: string) => any;
}

const handleReject = (rejectedFiles: any) => {
  toast.error(`Unable to upload image!`, {
    description: rejectedFiles
      .map((files: any) => {
        const name: string = files.file.name;
        const reason: string = files.errors
          .map((error: { code: string; message: string }) =>
            error.code !== 'file-too-large' ? error.message : 'Image cannot be larger than 5 MB!'
          )
          .join(', ');
        return `${name}: ${reason}`;
      })
      .join('\n'),
  });
};

export default function SignupDnd({ error, setCustomAvatar }: Props) {
  const [avatarIndex, setAvatarIndex] = useState(Math.floor(Math.random() * defaultProfilePicsUrl.length));
  const [avatar, setAvatar] = useState(defaultProfilePicsUrl[avatarIndex]!);

  useEffect(() => {
    setAvatar(defaultProfilePicsUrl[avatarIndex]!);
  }, [avatarIndex]);

  const onDrop = useCallback(
    (acceptedFiles: any, rejectedFiles: any, e: any) => {
      if (rejectedFiles.length > 0) {
        handleReject(rejectedFiles);
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.onabort = () => {
        error('Unable to load image!');
      };
      reader.onerror = () => {
        error('Unable to load image!');
      };
      reader.onload = () => {
        if (!reader.result) {
          error('Unable to load image!');
          return;
        }

        try {
          setAvatar(String(reader.result));
          setCustomAvatar(true, String(reader.result));
        } catch (e) {
          error('Unable to load image!');
        }
      };
    },
    [error, setCustomAvatar]
  );

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
    maxFiles: 1,
    maxSize: CLOUDINARY_MAX_IMG_SIZE,
  });

  const handleRemoveCustomAvatar = useCallback(() => {
    setAvatarIndex(Math.floor(Math.random() * defaultProfilePicsUrl.length));
    setCustomAvatar(false, '');
  }, [setCustomAvatar]);

  const handleRandomizeAvatar = useCallback(() => {
    setAvatarIndex((avatarIndex + 1) % defaultProfilePicsUrl.length);
    setCustomAvatar(false, '');
  }, [setCustomAvatar, avatarIndex]);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <label
        htmlFor="DragAndDrop"
        className={cn(
          'flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-dashed border-transparent text-center',
          isDragActive && 'border-dashed p-4',
          isDragAccept && 'border-mint-down',
          isDragReject && 'border-tomato'
        )}
        {...getRootProps()}
      >
        <div className="flex justify-center">
          <NextImage
            src={avatar}
            width={100}
            height={100}
            alt="Default Profile"
            className="size-[100px] rounded-full"
          />
        </div>
        <input id="DragAndDrop" {...getInputProps()} />
        {isDragAccept && <p className="text-sm">Drop it!</p>}
        {isDragReject && <p className="text-sm">Ooops. Did you mean to upload another file?</p>}
        {!isDragActive && <p className="text-sm">Click to select an image or drop the file!</p>}
      </label>
      <div className="flex items-center justify-center gap-2">
        <button type="button" onClick={handleRemoveCustomAvatar}>
          <NextImage
            src="/svg/trash-outline.svg"
            alt="Delete"
            width={20}
            height={20}
            className="object-contain dark:invert"
          />
        </button>
        <button type="button" onClick={handleRandomizeAvatar}>
          <NextImage
            src={'/svg/shuffle-outline.svg'}
            alt="Randomize"
            width={20}
            height={20}
            className="object-contain dark:invert"
          />
        </button>
      </div>
    </div>
  );
}
