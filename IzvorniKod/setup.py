from setuptools import setup

# for spliting app into multiple files
setup(
    name='GlobeRunner',
    packages='backend',
    include_package_data=True,
    install_requires=[
        'flask'
    ],
)