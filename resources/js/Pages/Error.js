import React from 'react';
import Helmet from 'react-helmet';

export default ({ status }) => {
  // const { status } = usePage().props;

  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden'
  }[status];

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.'
  }[status];

  return (
    <div className="flex items-center justify-center min-h-screen p-5 text-indigo-100 bg-indigo-800">
      <Helmet title={title} />
      <div className="w-full max-w-md">
        <h1 className="text-3xl">{title}</h1>
        <p className="mt-3 text-lg leading-tight">{description}</p>
      </div>
    </div>
  );
};
