from django.contrib.auth.models import Group
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create default groups"

    def handle(self, *args, **kwargs):
        groups = ["Admin", "Users", "Cooks", "Planners"]

        for group_name in groups:
            group, created = Group.objects.get_or_create(name=group_name)
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f'Group "{group_name}" created successfully')
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f'Group "{group_name}" already exists')
                )
