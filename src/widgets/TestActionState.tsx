import React, { useActionState } from 'react';

export default function TestActionState() {
  const [] = useActionState<null, FormData>((state, formData) => {
    const d = 2;
    return null;
  }, null);
  return <div>TestActionState</div>;
}
